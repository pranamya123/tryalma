// app/lib/leads.ts
export const getLeads = () => {
    const leads = localStorage.getItem("leads");
    return leads ? JSON.parse(leads) : [];
  };
  
  export const addLead = (lead: any) => {
    const leads = getLeads();
    leads.push(lead);
    localStorage.setItem("leads", JSON.stringify(leads));
  };
  
  export const updateLeadState = (index: number, state: string) => {
    const leads = getLeads();
    leads[index].state = state;
    localStorage.setItem("leads", JSON.stringify(leads));
  };