# Phase 4 — System Modeling (draw.io)

## Tool: draw.io (app.diagrams.net)

### How to Get Started

1. Open **https://app.diagrams.net** in your browser
2. Click **"Create New Diagram"**
3. Choose **"Blank Diagram"** and click **Create**
4. Save the file as `krushimart-<diagram-name>.drawio`

### How to Find UML Shapes

1. In the left panel, click **"Search Shapes"** (magnifying glass icon)
2. Type keywords like: `use case`, `class`, `actor`, `sequence`, `component`
3. Drag shapes from the panel onto the canvas
4. Double-click any shape to add text

### How to Draw Connections

1. Hover over a shape until blue dots appear
2. Click and drag from a blue dot to another shape
3. Use the toolbar to change line style (solid, dashed, arrow)
4. For UML stereotypes like `<<include>>`, add text to the connector line

### How to Export

1. **File → Export As → PNG** (for screenshots in report)
2. **File → Export As → PDF** (for printing)
3. Set zoom to **100%** for crisp output
4. Check **"Selection Only"** if you want to export a specific part

### Diagram Files in This Folder

| File | Diagram Type | Description |
|---|---|---|
| `01-use-case-diagram.md` | Use Case Diagram | Actors and system interactions |
| `02-class-diagram.md` | Class Diagram | Database models and relationships |
| `03-sequence-diagram.md` | Sequence Diagram | Key system flows with timing |
| `04-activity-diagram.md` | Activity Diagram | Business process workflows |
| `05-architecture-diagram.md` | Architecture Diagram | System component layout |
| `06-design-methodology.md` | — | Design methodology justification |

### Tips for KrushiMart Diagrams

- **Actors** in use case diagrams: Guest, Consumer, Farmer, Admin
- **Classes** in class diagram: User, Product, Category, Cart, Order, Review
- **Lifelines** in sequence diagrams: Browser, Frontend, API, Controller, Model, Database
- Use **green** for success paths, **red** for error paths
- Keep diagrams simple — one concept per diagram
