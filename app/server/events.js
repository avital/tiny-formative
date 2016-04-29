import { EventEmitter } from "events";

// Used to send notifications between methods and publications to
// implement live queries without oplog tailing or poll-and-diff.
//
// If we want to allow notifications across application servers,
// we could use https://github.com/freeall/redis-eventemitter
Notifications = new EventEmitter;

Notifications.setMaxListeners(Infinity);
