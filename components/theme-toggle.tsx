'use client';
import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';
export default function ThemeToggle(){const [dark,setDark]=useState(true);useEffect(()=>{let saved=true;try{saved=localStorage.getItem('lead-theme')!=='light'}catch{}setDark(saved);document.documentElement.dataset.theme=saved?'dark':'light';},[]);return <button className="global-theme-toggle" aria-label={dark?'Use light mode':'Use dark mode'} title={dark?'Use light mode':'Use dark mode'} onClick={()=>{const next=!dark;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';try{localStorage.setItem('lead-theme',next?'dark':'light')}catch{}}}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button>}
