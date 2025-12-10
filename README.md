# Check out live demo at https://hr-workflow-designer-module.onrender.com/

# How to start 
## 1. Clone the repo
git clone https://github.com/SherinPS7/HR_Workflow_Designer_Module.git

## 2. Go into the client app 
cd HR_Workflow_Designer_Module/client

## 3. Install dependencies
npm install

## 4. Start the dev server
npm start

## Code Architecture
<img width="478" height="843" alt="image" src="https://github.com/user-attachments/assets/14d17233-7f14-4e60-8cee-4bdee8dfe799" />

## What’s Unique About This Implementation (Beyond the Brief)

This prototype implements everything in the exercise and goes further in a few important ways.

- **1. Richer live editor UX, not just a canvas**  
  - Drag-and-drop node creation from a sidebar, plus live, type-specific forms that auto-open when a node is selected.  
  - The inspector remembers form state per node, so you can switch nodes and tabs without losing edits.

- **2. Opinionated validation with visual feedback**  
  - Validation goes beyond “Start must be first”: it enforces a connected, well-formed flow (single Start, at least one End, no isolated nodes, required in/out degrees, reachability from Start).  
  - Errors show up both as a human-readable list and as red highlights directly on invalid nodes.

- **3. Integrated status dashboard and simulation**  
  - Dedicated **Status** tab that shows node count, last workflow action, and a one-click “Test workflow” simulation with an execution log.  
  - This turns the prototype into a small observability surface for the workflow graph, not just an editor.

- **4. Developer-friendly, future-proof architecture**  
  - Canvas, inspector, validation, and mock APIs are cleanly separated and wired through a single Zustand store, so new node types, rules, or backend integrations can be added without touching core plumbing.

<img width="1912" height="910" alt="image" src="https://github.com/user-attachments/assets/b86a84df-8b9e-4812-b26b-f6ad5e2184a9" />

<img width="1914" height="901" alt="image" src="https://github.com/user-attachments/assets/aee86f19-1e64-4288-979b-5eac17c34509" />

## Implemented Functionality

This project covers and extends the functional requirements from the brief. 

### Canvas & Drag-and-Drop Interface

- React Flow canvas with custom **Start**, **Task**, **Approval**, **Automated Step**, and **End** nodes.  
- Nodes are created by dragging from a sidebar and dropping onto the canvas at the cursor position.  
- Edges can be drawn between nodes, and nodes/edges can be deleted. 


https://github.com/user-attachments/assets/741057af-8dc3-45ca-9cf5-cec30812bbec

### Live Node Editing With Persistent Forms

- Selecting a node automatically opens the **Details** tab and shows a form specific to that node’s type.  
- Forms are controlled and backed by the workflow store, so edits are live and persist when switching nodes or tabs.

Node-specific fields (all stored in `node.data`):

- **Start:** start title, optional metadata key/value.  
- **Task:** required title, description, assignee, role, due date, optional custom key/value.  
- **Approval:** title, approver role, auto-approve threshold.  
- **Automated Step:** title, action from a mock API list, dynamic parameters based on the selected action.  
- **End:** end message, summary flag toggle.  


https://github.com/user-attachments/assets/ebbeb266-dec1-45f3-b183-a083792d83b6


### Undo / Redo and History

- Bounded history of graph snapshots (nodes, edges, and last action) is maintained in the store.  
- Undo/redo restores both the structure and validation state, so you can safely experiment with different flows.
  

### Canvas Zoom, Fit, and Minimap

- Zoom controls and fit-to-view behavior are enabled via React Flow.  
- A minimap gives an overview of large workflows and helps with navigation.


https://github.com/user-attachments/assets/026b971e-04ae-4659-b867-7768a39f0339


### Validation With Visual Indicators

Validation rules include:

- Exactly one Start node and at least one End node.  
- Start must have outgoing edges; End must not have outgoing edges.  
- No isolated nodes; non-start nodes must have at least one incoming edge; non-end nodes must have at least one outgoing edge.  
- All nodes must be reachable from the Start node.

Errors are:

- Listed in a dedicated **Validation** tab with clear messages and optional node IDs.  
- Reflected as red error glows on nodes via a `useNodeHasError(nodeId)` selector.


https://github.com/user-attachments/assets/7c71bf53-437f-42da-a75c-8eb15a10fb17



### Status / Simulation Panel

- **Status** tab shows:
  - Total number of nodes.  
  - Last action from the history (e.g., “Added task node”, “Connected nodes”).  
  - A **Test workflow** button that serializes the current graph and calls a mock `simulate` API.  
- Simulation returns a list of execution steps, rendered as a simple execution log.



https://github.com/user-attachments/assets/05ba1093-990b-4cea-a44c-ce1745945519

### Nodes and their specific functions 
https://github.com/user-attachments/assets/cef224df-3b31-4807-b05c-106325991dbf


---

## Why This Architecture Works Well for the Future

The structure is intentionally biased toward extensibility, testability, and clear ownership, matching the architecture expectations in the brief. 

### Single, Explicit Workflow Store (Zustand)

- All workflow state (nodes, edges, history, selection, active tab, validation errors) lives in one typed store.  
- React Flow is treated as a visualizer: it renders `nodes`/`edges` and emits change events, while the store owns how those changes are applied and validated.  
- `validateWorkflow(nodes, edges)` is a pure function called from store actions (`addNode`, `onConnect`, `onNodesChange`, `onEdgesChange`, `undo`, `redo`), so validation always reflects the current graph.

**Future benefit:** Features like export/import, multi-user collaboration, or backend persistence can be added by working against the store shape, without rewriting UI components.

### Strict Separation of Concerns

- **Canvas:** layout + React Flow wiring (drag-and-drop, zoom, minimap, selection).  
- **Nodes:** purely presentational; they read props and error state but never mutate global state directly.  
- **Inspector:** owns the right-side tabs (Details, Validation, Status) and UX flows like “on node click → open Details tab”.  
- **Validation:** encapsulated in a pure `validateWorkflow` utility that returns typed `ValidationError`s.  
- **API layer:** `fetchAutomations` and `simulateWorkflow` live under `api/` and hide whether data comes from mocks, MSW, or a real backend. [file:202]


### Type-Aware, Composable Forms

- `NodeFormPanel` renders based on `node.type`, using shared building blocks (common title field, dropdowns, dynamic params).  
- Automated step parameters are generated from the automation definition returned by `GET /automations`, so the UI reflects API-driven schemas. [file:202]

### First-Class Validation and Observability

- Validation errors are first-class state in the store, not just console warnings.  
- The Status tab and simulation log treat workflows as executable graphs, making it natural to plug in a real workflow engine or richer simulations in the future. [file:202]








