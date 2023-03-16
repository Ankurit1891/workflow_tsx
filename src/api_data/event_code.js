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
    { actionType: 101, text: "ApiCall", key: 1 },
    { actionType: 102, text: "Alert", key: 2 },
    { actionType: 103, text: "Hook", key: 3 },
    { actionType: 104, text: "Limit Uilization", key: 4 },
  ],
});
server.get("/api/post_transition_options", {
  data: [
    { actionType: 101, text: "ApiCall", key: 1 },
    { actionType: 102, text: "Alert", key: 2 },
    { actionType: 103, text: "Hook", key: 3 },
    { actionType: 104, text: "Limit Uilization", key: 4 },
  ],
});
server.get("/api/conditional_next_state", {
  data: [
    { actionType: 101, text: "ApiCall", key: 1 },
    { actionType: 102, text: "Alert", key: 2 },
    { actionType: 103, text: "Hook", key: 3 },
    { actionType: 104, text: "Limit Uilization", key: 4 },
  ],
});

server.get("/api/pre_transcition_action/alert", {
  data: [
    { key: 1, text: "PRE SEND Email 1" },
    { key: 2, text: "PRE SEND Email 2" },
    { key: 3, text: "PRE SEND Email 3" },
    { key: 4, text: "PRE SEND Email 4" },
  ],
});

server.get("/api/pre_transcition_action/hooks", {
  data: [
    { key: 1, text: "PRE HOOK 1" },
    { key: 2, text: "PRE HOOK 2" },
    { key: 3, text: "PRE HOOK 3" },
    { key: 4, text: "PRE HOOK 4" },
  ],
});

server.get("/api/pre_transcition_action/limit_utilization", {
  data: [
    { key: 1, text: "PRE LIMIT UTILIZATION 1" },
    { key: 2, text: "PRE LIMIT UTILIZATION 2" },
    { key: 3, text: "PRE LIMIT UTILIZATION 3" },
    { key: 4, text: "PRE LIMIT UTILIZATION 4" },
  ],
});

server.get("/api/pre_transcition_action/api_call", {
  data: [
    { key: 1, text: "PRE API Call 1" },
    { key: 2, text: "PRE API Call 2" },
    { key: 3, text: "PRE API Call 3" },
    { key: 4, text: "PRE API Call 4" },
  ],
});

server.get("/api/post_transcition_action/alert", {
  data: [
    { key: 1, text: "POST SEND Email 1" },
    { key: 2, text: "POST SEND Email 2" },
    { key: 3, text: "POST SEND Email 3" },
    { key: 4, text: "POST SEND Email 4" },
  ],
});

server.get("/api/post_transcition_action/hooks", {
  data: [
    { key: 1, text: "POST HOOK 1" },
    { key: 2, text: "POST HOOK 2" },
    { key: 3, text: "POST HOOK 3" },
    { key: 4, text: "POST HOOK 4" },
  ],
});

server.get("/api/post_transcition_action/limit_utilization", {
  data: [
    { key: 1, text: "POST LIMIT UTILIZATION 1" },
    { key: 2, text: "POST LIMIT UTILIZATION 2" },
    { key: 3, text: "POST LIMIT UTILIZATION 3" },
    { key: 4, text: "POST LIMIT UTILIZATION 4" },
  ],
});

server.get("/api/post_transcition_action/api_call", {
  data: [
    { key: 1, text: "POST API Call 1" },
    { key: 2, text: "POST API Call 2" },
    { key: 3, text: "POST API Call 3" },
    { key: 4, text: "POST API Call 4" },
  ],
});
