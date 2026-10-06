export const verificationStates=['Needs manual review','Partially verified','Email not found','Verified from official website','Verified from CBSE','Verified from CISCE','Verified from government source'] as const;
export function verified(value:string){return value?.startsWith('Verified from ');}
export function normalize(value:string){return (value||'').toLowerCase().replace(/[^a-z0-9]/g,'');}
export function validEmail(value:string){return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value||'');}
export function draftFor(r:any,c:any){
 const organization=r.organization||r.name;const ngo=r.lead_type==='NGOs';
 const greeting=r.contact_person|| (ngo?'Partnerships Team':'School Leadership Team');
 const fact=r.personalization_notes?.trim();
 if(!verified(r.verification)||!validEmail(r.email)||!fact||!r.evidence_url)throw Error('Verify the email, source and a specific fact before personalizing.');
 return {subject:ngo?`Potential STEM partnership with ${organization}`:`Robotics, AI & STEM partnership for ${organization}`,body:`Dear ${greeting},\n\nI am reaching out from ${c.business_name}${c.locations?' ('+c.locations+')':''}.\n\nYour published information notes: ${fact}\n\n${ngo?`We would welcome a discussion about a small pilot with ${organization}, shaped around your beneficiaries and education priorities. Possible models include community STEM workshops, school-based programs or a jointly planned CSR-supported initiative.`:`We would welcome a discussion about a hands-on learning program for ${organization}, designed around your students and existing facilities. A workshop or demonstration can be a useful first step before planning a longer program.`}\n\nOur services include ${(c.services||[]).join(', ')}. We can discuss teacher support, student project mentoring and an agreed way to review program outcomes.\n\nWould your team be available for a brief discussion about a suitable pilot?\n\n${c.brochure_url?'Brochure: '+c.brochure_url+'\n':''}${c.website_url?'Website: '+c.website_url+'\n':''}\n${c.email_signature||[c.business_name,c.contact_email,c.phone].filter(Boolean).join('\n')}`};
}
export function businessDate(start:string,days:number){const date=new Date(start);let left=days;while(left>0){date.setUTCDate(date.getUTCDate()+1);if(![0,6].includes(date.getUTCDay()))left--;}return date.toISOString().slice(0,10);}
