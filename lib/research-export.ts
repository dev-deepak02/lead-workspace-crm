const columns=['organization','contact_person','email','alternate_email','phone','website','city','district','state','lead_type','board','source_url','verification','score','subject','body','draft_status','gmail_draft_id','next_follow_up'];
const safe=(v:any)=>/^[=+@\-\t\r]/.test(String(v))?"'"+v:String(v??'');
export async function exportResearch(records:any[],format:string){const data=records.map(x=>({...x.data,id:x.id}));let blob:Blob;
 if(format==='json')blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
 else if(format==='csv'){const quote=(v:any)=>'"'+safe(v).replaceAll('"','""')+'"';blob=new Blob(['\uFEFF'+[columns.join(','),...data.map(r=>columns.map(c=>quote(r[c])).join(','))].join('\r\n')],{type:'text/csv'});}
 else if(format==='xlsx'){const ExcelJS=await import('exceljs');const book=new ExcelJS.Workbook();const sheet=book.addWorksheet('Research');sheet.addRow(columns);for(const r of data)sheet.addRow(columns.map(c=>safe(r[c])));sheet.getRow(1).font={bold:true};sheet.columns.forEach(c=>c.width=28);blob=new Blob([await book.xlsx.writeBuffer() as any],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});}
 else {const {jsPDF}=await import('jspdf');const doc=new jsPDF();let y=18;doc.setFontSize(16);doc.text('Lead research and outreach',14,y);y+=12;doc.setFontSize(10);for(const r of data){for(const c of columns){const text=c+': '+String(r[c]??'');for(const line of doc.splitTextToSize(text,180)){if(y>280){doc.addPage();y=18;}doc.text(line,14,y);y+=5;}}y+=8;}blob=doc.output('blob');}
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='research-leads.'+format;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
