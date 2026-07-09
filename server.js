const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const FILE = "leads.json";

// Get all leads
app.get("/leads", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

// Add lead
app.post("/leads", (req, res) => {
    const leads = JSON.parse(fs.readFileSync(FILE));

    const lead = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        source: req.body.source,
        status: "New",
        notes: req.body.notes
    };

    leads.push(lead);

    fs.writeFileSync(FILE, JSON.stringify(leads, null, 2));

    res.json({ message: "Lead Added" });
});

// Update status
app.put("/leads/:id", (req, res) => {

    let leads = JSON.parse(fs.readFileSync(FILE));

    leads = leads.map(l => {
        if (l.id == req.params.id) {
            l.status = req.body.status;
        }
        return l;
    });

    fs.writeFileSync(FILE, JSON.stringify(leads, null, 2));

    res.json({ message: "Updated" });

});

// Delete Lead
app.delete("/leads/:id", (req, res) => {

    let leads = JSON.parse(fs.readFileSync(FILE));

    leads = leads.filter(l => l.id != req.params.id);

    fs.writeFileSync(FILE, JSON.stringify(leads, null, 2));

    res.json({ message: "Deleted" });

});

app.listen(PORT, () => {
    console.log("Server Running : http://localhost:3000");
});