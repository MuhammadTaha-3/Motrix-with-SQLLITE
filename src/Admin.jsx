import {useEffect,useRef,useState} from 'react'
import {useStore,money} from './store'
const EMAIL='motrix@gmail.com',PASS='motrix@2255'
const blank={brand:'',name:'',price:'',stock:20,img:'/products/1.jpg',desc:'Full-face shell with a fog-resistant visor, multi-density EPS liner and a quick-release micro-lock buckle.'}
const ST={Pending:'#9ca3af',Confirmed:'#3b82f6',Processing:'#f59e0b',Shipped:'#8b5cf6',Delivered:'#22c55e',Cancelled:'#ef4444'}
function Status({value,onChange,up}){const [o,setO]=useState(false),r=useRef()
useEffect(()=>{const f=e=>r.current&&!r.current.contains(e.target)&&setO(false);addEventListener('mousedown',f);return()=>removeEventListener('mousedown',f)},[])
return <div className="st" ref={r}><button type="button" className="stb" onClick={()=>setO(!o)}><i style={{background:ST[value]}}/>{value}<span className={o?'flip':''}>▾</span></button>
{o&&<ul className={'stm '+(up?'up':'')}>{Object.keys(ST).map(s=><li key={s} className={s===value?'on':''} onClick={()=>{onChange(s);setO(false)}}><i style={{background:ST[s]}}/>{s}{s===value&&<b>✓</b>}</li>)}</ul>}</div>}
export default function Admin(){const {admin,setAdmin,products,setProducts,orders,setOrders}=useStore()
const [e,setE]=useState(''),[p,setP]=useState(''),[err,setErr]=useState(''),[tab,setTab]=useState('dash'),[f,setF]=useState(null)
if(!admin)return <div className="alogin"><form className="panel acard" onSubmit={x=>{x.preventDefault();e===EMAIL&&p===PASS?setAdmin(true):setErr('Invalid email or password')}}>
<h2 className="logo">MOTRIX</h2><small>Admin sign in</small><label>Email<input value={e} onChange={x=>setE(x.target.value)} placeholder="motrix@gmail.com"/></label>
<label>Password<input type="password" value={p} onChange={x=>setP(x.target.value)}/></label>{err&&<small className="err">{err}</small>}<button className="btn dark">Sign in</button><a href="/" className="u"><span className="bk"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style={{display:"block"}}><path d="M15 5l-7 7 7 7"/></svg></span>Back to store</a></form></div>
const save=x=>{x.preventDefault();const slug=(f.brand+'-'+f.name).toLowerCase().replace(/[^a-z0-9]+/g,'-')
 const d={...f,price:+f.price,stock:+f.stock}
 setProducts(f.id?products.map(a=>a.id===f.id?d:a):[...products,{...d,id:Date.now(),slug,sizes:['Small','Medium','Large'],cert:'ECE 22.06'}]);setF(null)}
const rev=orders.reduce((s,o)=>s+o.total,0)
return <div className="admin"><aside><h2 className="logo">MOTRIX</h2><small>Admin</small>{[['dash','Dashboard'],['prod','Products'],['ord','Orders']].map(([k,n])=><button key={k} className={tab===k?'on':''} onClick={()=>setTab(k)}>{n}</button>)}
<a href="/">View store</a><button onClick={()=>setAdmin(false)}>Sign out</button></aside>
<section>{tab==='dash'&&<><h1>DASHBOARD</h1><div className="stats">{[['Revenue',money(rev)],['Orders',orders.length],['Products',products.length],['Pending',orders.filter(o=>!['Delivered','Cancelled'].includes(o.status)).length]].map(([a,b])=><div key={a} className="panel"><small>{a}</small><div className="big">{b}</div></div>)}</div></>}
{tab==='prod'&&<><div className="sec"><h1>PRODUCTS</h1><button className="btn dark" onClick={()=>setF(blank)}>+ Add product</button></div>
<div className="panel"><table><thead><tr><th/><th>Name</th><th>Price</th><th>Stock</th><th/></tr></thead><tbody>{products.map(a=><tr key={a.id}><td><img src={a.img} width="48" alt=""/></td><td>{a.brand} {a.name}</td><td>{money(a.price)}</td><td>{a.stock}</td>
<td><a onClick={()=>setF(a)}>Edit</a> · <a className="err" onClick={()=>confirm('Delete?')&&setProducts(products.filter(x=>x.id!==a.id))}>Delete</a></td></tr>)}</tbody></table></div></>}
{tab==='ord'&&<><h1>ORDERS</h1><div className="panel"><table><thead><tr><th>ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map((o,i)=><tr key={o.id}><td>{o.id}</td><td>{o.name}<br/><small>{o.phone} · {o.address}</small></td><td>{o.items.map(i=>`${i.name} (${i.size}×${i.qty})`).join(', ')}</td><td>{money(o.total)}</td>
<td><Status value={o.status} up={orders.length>3&&i>=orders.length-2} onChange={s=>setOrders(orders.map(a=>a.id===o.id?{...a,status:s}:a))}/></td></tr>)}</tbody></table></div></>}</section>
{f&&<div className="modal"><form className="panel acard" onSubmit={save}><h3>{f.id?'EDIT':'ADD'} PRODUCT</h3>
<label>Brand<input required value={f.brand} onChange={x=>setF({...f,brand:x.target.value})}/></label><label>Name<input required value={f.name} onChange={x=>setF({...f,name:x.target.value})}/></label>
<label>Price<input required type="number" step="0.01" value={f.price} onChange={x=>setF({...f,price:x.target.value})}/></label><label>Stock<input required type="number" value={f.stock} onChange={x=>setF({...f,stock:x.target.value})}/></label>
<label>Image URL<input value={f.img} onChange={x=>setF({...f,img:x.target.value})}/></label><label>Or upload<input type="file" accept="image/*" onChange={x=>{const r=new FileReader();r.onload=()=>setF(v=>({...v,img:r.result}));x.target.files[0]&&r.readAsDataURL(x.target.files[0])}}/></label><div className="row"><button className="btn dark">Save</button><button type="button" className="btn light" onClick={()=>setF(null)}>Cancel</button></div></form></div>}</div>}
