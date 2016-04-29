# tiny-formative app

This demonstrates an efficient implementation of a teacher dashboard
showing multiple students drawing at the same time. The server
environment only uses Meteor's Mongo driver and the DDP server. It
completely bypasses Meteor's Livequery system.

## Data model

Drawings are stored in the database as a set of documents that look
like this:
```js
{
  "_id" : "sF3pNYpqMfpBgMiHb",
  "u" : "0.9706229337025434",
  "s" : [
    { "p" : { "x" : "203.00", "y" : "104.00" }, "hI" : { "x" : "0.00", "y" : "0.00" }, "hO" : { "x" : "0.00", "y" : "-1.05" } },
    { "p" : { "x" : "206.00", "y" : "103.00" }, "hI" : { "x" : "-1.05", "y" : "0.00" }, "hO" : { "x" : "16.00", "y" : "0.00" } },
    (...)
  ]
}
```

`"u"` is the student's fake generated user id.
`"s"` is an array of segments in a format like paperjs expects, but with shortened field names

## Publication and method model

When the server loads, all drawings are fetched from Mongo into an
in-memory cache (a simple JavaScript object).

The teacher's browser subscribes to the `teacher` subscription, which
sends down the current state of all drawings from the in-memory cache.

When the `draw` method is called on the server, the publication is
notified about the new segment, which causes a DDP message to be sent
to the teacher's browser.

None of Meteor's LiveQuery, minimongo or oplog tailing functionality
is used.

There is no publication merging, so there is no additional memory and
CPU overhead on the server.

## Scaling plan

We'll definitely need multiple application servers, and we'll shard
them based on classroom (meaning all students and teachers in the same
class will connect to the same server). This way, we can keep our
in-memory notification system, and have more predictable server
performance.

Here's a sketch of a sharding plan: There's a Mongo collection that
maps classroom to application servers. When a student's browser
connects to the server, it first asks which server is dealing with her
classroom and opens a new DDP connection to that server specifically
for the `draw` method. Similarly, for the teacher before subscribing
to the `teacher` subscription.

There are some challenges with this plan:

* What if an application server fails, or if we intentionally decrease
  the number of servers? A new application server needs to take its
  place, and all connected clients need to know to reconnect. (Note
  that in this case we'll lose the last 5 seconds of drawing but that
  seems acceptible)

* How do we keep the application servers balanced? For example, when
  we add new application servers, we'll want new classrooms to go to
  that one rather than the older, more loaded servers. Maybe we just
  assign new classrooms to the least loaded application server.

We'll also have to do something to not keep all drawings in memory on
all application servers. A simple solution is to use an LRU cache for
which classrooms that server has been dealing with.
