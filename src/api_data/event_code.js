import { createServer } from "miragejs";

export const server = createServer();
server.get("/api/event_code", {
  codes: [
    { key: 1, text: "OnAdd" },
    { key: 2, text: "OnApprove" },
    { key: 3, text: "OnReject" },
    { key: 4, text: "OnWithdraw" },
    { key: 5, text: "OnEdit" },
    { key: 6, text: "OnDelete" },
    { key: 7, text: "EventFinish" },
  ],
});
server.get("/api/pre_transition_options", {
  data: [
    { actionType: 101, text: "pre ApiCall", key: 1 },
    { actionType: 102, text: "pre Alert", key: 2 },
    { actionType: 103, text: "pre Hook", key: 3 },
    { actionType: 104, text: "pre Limit Utilization", key: 4 },
  ],
});
server.get("/api/post_transition_options", {
  data: [
    { actionType: 101, text: "post ApiCall", key: 1 },
    { actionType: 102, text: "post Alert", key: 2 },
    { actionType: 103, text: "post Hook", key: 3 },
    { actionType: 104, text: "post Limit Uilization", key: 4 },
  ],
});
server.get("/api/conditional_next_state", {
  data: [
    { actionType: 101, text: "conditional ApiCall", key: 1 },
    { actionType: 102, text: "conditional Alert", key: 2 },
    { actionType: 103, text: "conditional Hook", key: 3 },
    { actionType: 104, text: "conditional Limit Uilization", key: 4 },
  ],
});

server.get("/api/pre_transcition_action/102", {
  data: [
    { key: 1, text: "PRE SEND Email 1" },
    { key: 2, text: "PRE SEND Email 2" },
    { key: 3, text: "PRE SEND Email 3" },
    { key: 4, text: "PRE SEND Email 4" },
  ],
});

server.get("/api/pre_transcition_action/103", {
  data: [
    { key: 1, text: "PRE HOOK 1" },
    { key: 2, text: "PRE HOOK 2" },
    { key: 3, text: "PRE HOOK 3" },
    { key: 4, text: "PRE HOOK 4" },
  ],
});

server.get("/api/pre_transcition_action/104", {
  data: [
    { key: 1, text: "PRE LIMIT UTILIZATION 1" },
    { key: 2, text: "PRE LIMIT UTILIZATION 2" },
    { key: 3, text: "PRE LIMIT UTILIZATION 3" },
    { key: 4, text: "PRE LIMIT UTILIZATION 4" },
  ],
});

server.get("/api/pre_transcition_action/101", {
  data: [
    { key: 1, text: "PRE API Call 1" },
    { key: 2, text: "PRE API Call 2" },
    { key: 3, text: "PRE API Call 3" },
    { key: 4, text: "PRE API Call 4" },
  ],
});

server.get("/api/post_transcition_action/102", {
  data: [
    { key: 1, text: "POST SEND Email 1" },
    { key: 2, text: "POST SEND Email 2" },
    { key: 3, text: "POST SEND Email 3" },
    { key: 4, text: "POST SEND Email 4" },
  ],
});

server.get("/api/post_transcition_action/103", {
  data: [
    { key: 1, text: "POST HOOK 1" },
    { key: 2, text: "POST HOOK 2" },
    { key: 3, text: "POST HOOK 3" },
    { key: 4, text: "POST HOOK 4" },
  ],
});

server.get("/api/post_transcition_action/104", {
  data: [
    { key: 1, text: "POST LIMIT UTILIZATION 1" },
    { key: 2, text: "POST LIMIT UTILIZATION 2" },
    { key: 3, text: "POST LIMIT UTILIZATION 3" },
    { key: 4, text: "POST LIMIT UTILIZATION 4" },
  ],
});

server.get("/api/post_transcition_action/101", {
  data: [
    { key: 1, text: "POST API Call 1" },
    { key: 2, text: "POST API Call 2" },
    { key: 3, text: "POST API Call 3" },
    { key: 4, text: "POST API Call 4" },
  ],
});
server.get("/api/conditional_next_state/order", {
  data: [
    { actionType: 101, text: "conditional Order 1", key: 1 },
    { actionType: 102, text: "conditional Order 2", key: 2 },
    { actionType: 103, text: "conditional Order 3", key: 3 },
    { actionType: 104, text: "conditional Order 4", key: 4 },
  ],
});
