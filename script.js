const API = "http://localhost:3000/leads";

async function loadLeads() {

    const res = await fetch(API);
    const leads = await res.json();

    document.getElementById("leadList").innerHTML = "";

    let total = leads.length;
    let newCount = 0;
    let contacted = 0;
    let converted = 0;

    leads.forEach(lead => {

        if (lead.status === "New") newCount++;
        if (lead.status === "Contacted") contacted++;
        if (lead.status === "Converted") converted++;

        document.getElementById("leadList").innerHTML += `

        <div class="card">

        <h3>${lead.name}</h3>

        <p>📧 ${lead.email}</p>

        <p>🌐 ${lead.source}</p>

        <p>📝 ${lead.notes}</p>

        <br>

        <select onchange="updateStatus(${lead.id},this.value)">
        <option ${lead.status=="New"?"selected":""}>New</option>
        <option ${lead.status=="Contacted"?"selected":""}>Contacted</option>
        <option ${lead.status=="Converted"?"selected":""}>Converted</option>
        </select>

        <button onclick="deleteLead(${lead.id})">Delete</button>

        </div>

        `;

    });

    document.getElementById("total").innerHTML = total;
    document.getElementById("newLead").innerHTML = newCount;
    document.getElementById("contacted").innerHTML = contacted;
    document.getElementById("converted").innerHTML = converted;

}

async function addLead(){

    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const source=document.getElementById("source").value;
    const notes=document.getElementById("notes").value;

    if(name=="" || email=="" || source==""){

        alert("Please fill all fields");
        return;

    }

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            source,
            notes
        })
    });

    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("source").value="";
    document.getElementById("notes").value="";

    alert("Lead Added Successfully");

    loadLeads();

}

async function updateStatus(id,status){

    await fetch(API+"/"+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({status})
    });

    loadLeads();

}

async function deleteLead(id){

    await fetch(API+"/"+id,{
        method:"DELETE"
    });

    loadLeads();

}

loadLeads();