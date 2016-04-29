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

