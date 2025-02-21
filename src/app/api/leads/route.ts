import { NextResponse } from 'next/server';

let leads = [
    {
      id: '1', 
      firstName: 'Jorge',
      lastName: 'Ruiz',
      email: 'jorge.ruiz@example.com',
      linkedin: 'linkedin.com/in/jorgeruiz',
      visas: 'H1B',
      resume: { name: 'resume.pdf' },
      message: 'Interested in a job',
      state: 'Pending',
      createdAt: new Date().toISOString(),
      country: 'Mexico' 
    },
    {
      id: '2', 
      firstName: 'Bahar',
      lastName: 'Zamir',
      email: 'bahar.zamir@example.com',
      linkedin: 'linkedin.com/in/baharzamir',
      visas: 'H1B',
      resume: { name: 'resume.pdf' },
      message: 'Looking for opportunities',
      state: 'Pending',
      createdAt: new Date().toISOString(),
      country: 'Mexico' 
    },
    { 
      id: '3',
      firstName: 'Mary',
      lastName: 'Lopez',
      email: 'mary.lopez@example.com',
      linkedin: 'linkedin.com/in/marylopez',
      visas: 'H1B',
      resume: { name: 'resume.pdf' },
      message: 'Seeking new roles',
      state: 'Pending',
      createdAt: new Date().toISOString(),
      country: 'Brazil'
    },
    { 
      id: '4',
      firstName: 'Li',
      lastName: 'Zijin',
      email: 'li.zijin@example.com',
      linkedin: 'linkedin.com/in/lizijin',
      visas: 'H1B',
      resume: { name: 'resume.pdf' },
      message: 'Exploring career prospects',
      state: 'Pending',
      createdAt: new Date().toISOString(),
      country: 'South Korea'
    },
    {
      id: '5',
      firstName: 'Mark',
      lastName: 'Antonov',
      email: 'mark.antonov@example.com',
      linkedin: 'linkedin.com/in/markantonov',
      visas: 'H1B',
      resume: { name: 'resume.pdf' },
      message: 'Open to opportunities',
      state: 'Pending',
      createdAt: new Date().toISOString(),
      country: 'Russia'
    },
    {
      id: '6',
      firstName: 'Jane',
      lastName: 'Ma',
      email: 'jane.ma@example.com',
      linkedin: 'linkedin.com/in/janema',
      visas: 'H1B',
      resume: { name: 'resume.pdf' },
      message: 'Looking for job openings',
      state: 'Pending',
      createdAt: new Date().toISOString(),
      country: 'Mexico'
    },
    {
      id: '7',
      firstName: 'Anand',
      lastName: 'Jain',
      email: 'anand.jain@example.com',
      linkedin: 'linkedin.com/in/anandjain',
      visas: 'H1B',
      resume: { name: 'resume.pdf' },
      message: 'Interested in new positions',
      state: 'Reached Out',
      createdAt: new Date().toISOString(),
      country: 'Mexico'
    },
    {
      id: '8',
      firstName: 'Anna',
      lastName: 'Voronova',
      email: 'anna.voronova@example.com',
      linkedin: 'linkedin.com/in/annavoronova',
      visas: 'H1B',
      resume: { name: 'resume.pdf' },
      message: 'Searching for opportunities',
      state: 'Pending',
      createdAt: new Date().toISOString(),
      country: 'France'
    }
  ];
  
export async function POST(req: Request) {
  const lead = await req.json();

  if (!lead.firstName || !lead.lastName || !lead.email || !lead.linkedin || !lead.visas || !lead.resume || !lead.message) {
    return new Response(JSON.stringify({ error: "All fields are required." }), { status: 400 });
  }

  //mock file upload
  const resume = lead.resume.name;

  const id = crypto.randomUUID();

  leads.push({
    ...lead,
    resume,
    state: "Pending",
    createdAt: new Date().toISOString(),
    id: id, 
    country: lead.country || 'Unknown' 
  });

  return new Response(JSON.stringify({ success: "Lead submitted successfully!" }), { status: 200 });
}

export async function GET() {
  return new Response(JSON.stringify(leads), { status: 200 });
}


export async function PATCH(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return new NextResponse(JSON.stringify({ message: 'Lead ID is required' }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const leadIndex = leads.findIndex(lead => lead.id === id);

  if (leadIndex === -1) {
    return new NextResponse(JSON.stringify({ message: 'Lead not found' }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  leads[leadIndex] = { ...leads[leadIndex], state: 'Reached Out' };

  return new NextResponse(JSON.stringify({ message: 'Lead status updated' }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
