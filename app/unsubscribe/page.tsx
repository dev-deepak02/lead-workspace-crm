'use client';
import {useState} from 'react';
export default function Page(){const [done,S]=useState(false),[error,E]=useState('');return <main className="auth-shell"><div className="card"><span className="eyebrow">EMAIL PREFERENCES</span><h1>{done?'You’re unsubscribed.':'Unsubscribe from outreach'}</h1><p>{done?'You will no longer receive outreach from this business.':'Confirm below to stop future outreach from this business.'}</p>{!done&&<button className="primary" onClick={async()=>{try{const r=await fetch('/api/unsubscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:new URLSearchParams(location.search).get('token')})});const d:any=await r.json();if(!r.ok)throw Error(d.error);S(true);}catch(e:any){E(e.message);}}}>Confirm unsubscribe</button>}{error&&<p className="error">{error}</p>}</div></main>;}


