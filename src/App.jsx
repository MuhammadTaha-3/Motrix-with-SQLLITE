import {useEffect,useRef,useState} from 'react'
import {useStore,money} from './store'
import Admin from './Admin'
const go=to=>{history.pushState({},'',to);dispatchEvent(new Event('navchange'));scrollTo(0,0)}
const useRoute=()=>{const [p,s]=useState(location.pathname);useEffect(()=>{const f=()=>s(location.pathname);addEventListener('popstate',f);addEventListener('navchange',f);return()=>{removeEventListener('popstate',f);removeEventListener('navchange',f)}},[]);return p.replace(/\/+$/,'')||'/'}
const L=({to,children,onClick,...p})=><a href={to} onClick={e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();onClick&&onClick(e);go(to)}} {...p}>{children}</a>
const Bag=()=><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7a3 3 0 016 0"/></svg>

function Nav({path}){const {count}=useStore()
return <header className="nav"><div className="navin"><L to="/" className="logo">MOTRIX</L>
<nav className="pill">{[['/','Home'],['/shop','Shop'],['/track','Track order'],['/contact','Contact']].map(([t,n])=><L key={t} to={t} className={path===t?'on':''}>{n}</L>)}</nav>
<L to="/cart" className="bag" aria-label="Cart"><Bag/>{count>0&&<i key={count} className="badge">{count}</i>}</L></div><nav className="dock">{[['/','Home','M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z'],['/shop','Shop','M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'],['/track','Track order','M3 6h18v12H3zM3 7l9 7 9-7'],['/cart','Cart','M6 8h12l1 12H5zM9 8a3 3 0 0 1 6 0']].map(([t,l,d])=><L key={t} to={t} aria-label={l} className={path===t?'on':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>{t==='/cart'&&count>0&&<i className="badge">{count}</i>}</L>)}</nav></header>}

function Footer(){return <footer className="foot"><div className="fin"><div><h3 className="flogo">Motrix</h3><p>Premium helmets designed for protection, comfort and performance. Safety never goes out of style.</p><L to="/contact" className="btn accent fbtn">Get in touch →</L></div>
<div><h6>EXPLORE</h6>{[['/','Home'],['/shop','Shop'],['/cart','Cart'],['/track','Track order']].map(([t,n])=><L key={t} to={t}>{n}</L>)}</div>
<div><h6>BRANDS</h6>{['Serps','Yamaha','BMW','LS2','Shark'].map(b=><L key={b} to="/shop">{b}</L>)}</div>
<div><h6>CONTACT</h6><span>✉ hello@motrix.com</span><span>✆ +1 (555) 014-2290</span><span>⌖ 123 Rider Street, Your City</span></div></div>
<div className="copy">© 2026 Motrix. All rights reserved.</div></footer>}

function Card({p}){const {addToCart}=useStore();const [ok,setOk]=useState(false)
return <L to={'/product/'+p.slug} className="card reveal" style={p.bg&&{background:`linear-gradient(${p.bg[0]},${p.bg[1]})`}}><img src={p.img} alt={p.name}/><span className="price">{money(p.price)}</span>
<div className="cname"><b>{p.brand}</b><b>{p.name}</b></div>
<button className={'cbtn '+(ok?'ok':'')} onClick={e=>{e.preventDefault();e.stopPropagation();addToCart(p,'Medium');setOk(true);setTimeout(()=>setOk(false),1200)}}><Bag/></button></L>}

function Home(){const {products}=useStore();const last=products[products.length-1]
return <><section className="hero"><div className="reveal"><h1>SAFETY NEVER<br/>GOES OUT OF<br/>STYLE</h1><p>Ride safer with premium helmets designed for protection, comfort, and performance.</p>
<div className="row"><L to="/shop" className="btn dark">Shop helmets</L>{last&&<L to={'/product/'+last.slug} className="btn light">See the {last.brand} {last.name.replace(/-/g,' ').replace('M PRO CARBON','M-Pro-Carbon')}</L>}</div></div>
<div className="heroimg reveal"><img src="/hero.jpg" alt="Motrix helmet"/></div></section>
<div className="sec"><h2>FAVORITE HELMETS</h2><L to="/shop" className="u">View all</L></div>
<div className="grid">{products.slice(0,3).map(p=><Card key={p.id} p={p}/>)}</div>
<div className="feats">{[['ECE 22.06','Certified impact protection on every helmet we sell.'],['Wind-tunnel tuned','Quiet and stable at motorway speed.'],['30-day returns','Ride in it. If it does not fit, send it back.']].map(([a,b])=><div key={a} className="feat reveal"><h4>{a}</h4><p>{b}</p></div>)}</div></>}

function Shop(){const {products}=useStore();const [q,setQ]=useState('')
const list=products.filter(p=>(p.brand+p.name).toLowerCase().includes(q.toLowerCase()))
return <><div className="sec"><h2>SHOP HELMETS</h2><input className="search" placeholder="Search helmets..." value={q} onChange={e=>setQ(e.target.value)}/></div>
<div className="grid">{list.map(p=><Card key={p.id} p={p}/>)}</div>{!list.length&&<p className="muted">No helmets found.</p>}</>}

function Swipe({onDone,done,label}){const tr=useRef(),[x,setX]=useState(0),[drag,setDrag]=useState(false)
const max=()=>tr.current.offsetWidth-56
const mv=e=>{if(!drag||done)return;const r=tr.current.getBoundingClientRect();setX(Math.min(Math.max(0,e.clientX-r.left-28),max()))}
const up=()=>{if(!drag)return;setDrag(false);if(x>max()*.8){setX(max());onDone()}else setX(0)}
return <div ref={tr} className={'swipe '+(done?'done':'')} style={!done&&x>0?{background:`linear-gradient(90deg,#f59e0b ${x+28}px,#111 ${x+28}px)`}:undefined} onPointerMove={mv} onPointerUp={up} onPointerLeave={up}>
<span>{done?'Added to cart':label+' >>>'}</span>
<div className="knob" style={{transform:done?'translateX(calc(100cqw - 56px))':`translateX(${x}px)`,transition:drag?'none':'transform .4s cubic-bezier(.2,.8,.2,1)'}} onPointerDown={e=>{if(done)return;setDrag(true);e.currentTarget.setPointerCapture(e.pointerId)}}>{done?'✓':<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style={{display:"block"}}><path d="M9 5l7 7-7 7"/></svg>}</div></div>}

function Product({slug}){const {products,addToCart}=useStore();const p=products.find(x=>x.slug===slug)
const [size,setSize]=useState('Medium'),[done,setDone]=useState(false),[i,setI]=useState(0),[fav,setFav]=useState(false)
if(!p)return <p className="muted">Product not found.</p>
const im=p.images?.length?p.images:[p.img]
return <div className="pdp"><div className="pimg reveal"><img key={i} src={im[i]} alt={p.name}/>
<L to="/shop" className="rb tl" aria-label="Back"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style={{display:"block"}}><path d="M15 5l-7 7 7 7"/></svg></L><button className={'rb tr '+(fav?'fav':'')} onClick={()=>setFav(!fav)}>{fav?'♥':'♡'}</button>
<em><i/>{p.stock>0?'In stock':'Sold out'}</em>
{im.length>1&&<><button className="rb mr" onClick={()=>setI((i+1)%im.length)} aria-label="Next"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style={{display:"block"}}><path d="M9 5l7 7-7 7"/></svg></button><div className="dots">{im.map((_,k)=><u key={k} className={k===i?'on':''}/>)}</div></>}</div>
<div className="pinfo reveal"><small>{p.brand} · {p.cert}</small><h1>{p.name}</h1><p>{p.desc}</p>
<small>Size</small><div className="sizes">{p.sizes.map(s=><button key={s} className={s===size?'on':''} onClick={()=>{setSize(s);setDone(false)}}>{s}</button>)}</div>
<small>Price</small><div className="big">{money(p.price)}{done&&<L to="/cart" className="u">View cart</L>}</div>
<Swipe key={size+done} done={done} label="Swipe to add to cart" onDone={()=>{addToCart(p,size);setDone(true)}}/></div></div>}

function Cart(){const {cart,qty,remove,total}=useStore()
return <><small className="lead">Review your</small><h1 className="h1">CART</h1>
{!cart.length?<div className="center"><p className="muted">Your cart is empty.</p><L to="/shop" className="btn dark">Shop helmets</L></div>:
<div className="cartgrid"><div className="clist">{cart.map((x,i)=><div key={i} className="crow"><img src={x.img} alt=""/><div className="cinfo"><small>{x.name.split(' ')[0][0]+x.name.split(' ')[0].slice(1).toLowerCase()} · {x.size}</small><h4>{x.name.split(' ').slice(1).join(' ')}</h4><small className="dk">{money(x.price)} each</small>
<div className="q"><button onClick={()=>qty(i,-1)}>−</button><span>{x.qty}</span><button onClick={()=>qty(i,1)}>+</button><b>{money(x.price*x.qty)}</b></div></div><button className="trash" onClick={()=>remove(i)} aria-label="Remove">🗑</button></div>)}</div>
<div className="sum"><div className="tot"><span>Subtotal</span><span>{money(total)}</span></div><div className="tot"><span>Shipping</span><span>Free</span></div><hr/><div className="tot big2"><span>Total</span><b>{money(total)}</b></div><L to="/checkout" className="btn accent">Checkout</L></div></div>}</>}

function Checkout(){const {cart,total,placeOrder}=useStore();const [f,setF]=useState({name:'',email:'',phone:'',address:'',city:'',state:''}),[id,setId]=useState('')
const s=k=>e=>setF({...f,[k]:e.target.value})
if(id)return <div className="center"><h1>THANK YOU!</h1><p>Your order <b>{id}</b> has been placed.</p><L to="/track" className="btn dark">Track order</L></div>
if(!cart.length)return <div className="center"><h1>CHECKOUT</h1><p className="muted">Your cart is empty.</p><L to="/shop" className="btn dark">Shop helmets</L></div>
return <><L to="/cart" className="back"><span className="bk"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style={{display:"block"}}><path d="M15 5l-7 7 7 7"/></svg></span>Back to cart</L><h1 className="h1">CHECKOUT</h1>
<form className="co" onSubmit={e=>{e.preventDefault();setId(placeOrder({name:f.name,email:f.email,phone:f.phone,address:[f.address,f.city,f.state].join(', ')}))}}>
<div className="panel"><h3><i>1</i> YOUR DETAILS</h3><div className="f2"><label>Full name<input required placeholder="Alex Rider" value={f.name} onChange={s('name')}/></label><label>Email<input required type="email" placeholder="you@email.com" value={f.email} onChange={s('email')}/></label></div>
<label>Phone<input required placeholder="+1 555 000 0000" value={f.phone} onChange={s('phone')}/></label>
<h3><i>2</i> DELIVERY ADDRESS</h3><label>Street address<input required placeholder="House no., street, area" value={f.address} onChange={s('address')}/></label>
<div className="f2"><label>City<input required placeholder="City" value={f.city} onChange={s('city')}/></label><label>State / Province<input required placeholder="State" value={f.state} onChange={s('state')}/></label></div></div>
<div className="sum"><h3>ORDER SUMMARY</h3>{cart.map((x,i)=><div key={i} className="si"><img src={x.img} alt=""/><div><b>{x.name}</b><small>{x.size} · Qty {x.qty}</small></div><span>{money(x.price*x.qty)}</span></div>)}
<div className="tot"><span>Subtotal</span><span>{money(total)}</span></div><div className="tot"><span>Shipping</span><span>Free</span></div><div className="tot big2"><span>Total</span><b>{money(total)}</b></div><button className="btn accent">Place order</button><small className="c">30-day returns on every helmet.</small></div></form></>}

function Track(){const {orders}=useStore();const [q,setQ]=useState(''),[r,setR]=useState(null)
return <div className="center"><h1>TRACK ORDER</h1><form className="row" onSubmit={e=>{e.preventDefault();setR(orders.find(o=>o.id.toLowerCase()===q.trim().toLowerCase())||'none')}}>
<input className="search" placeholder="Order ID e.g. MTX-1001" value={q} onChange={e=>setQ(e.target.value)}/><button className="btn dark">Track</button></form>
{r==='none'&&<p className="muted">No order found.</p>}{r&&r!=='none'&&<div className="panel left"><b>{r.id}</b><p>Status: <span className="tag">{r.status}</span></p>{r.items.map((i,k)=><small key={k}>{i.name} · {i.size} × {i.qty}</small>)}<b>Total {money(r.total)}</b></div>}</div>}
const Contact=()=><div className="center"><h1>CONTACT</h1><p>Email: <b>hello@motrix.com</b></p><p>Phone: <b>+1 (555) 014-2290</b></p><p className="muted">123 Rider Street, Your City</p></div>

export default function App(){const path=useRoute()
useEffect(()=>{const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.08})
 const scan=()=>document.querySelectorAll('.reveal:not(.in)').forEach(el=>io.observe(el));scan()
 const mo=new MutationObserver(scan);mo.observe(document.body,{childList:true,subtree:true});return()=>{io.disconnect();mo.disconnect()}},[])
if(path.startsWith('/admin'))return <Admin/>
let page=<Home/>
if(path==='/shop')page=<Shop/>;else if(path.startsWith('/product/'))page=<Product key={path} slug={path.split('/')[2]}/>
else if(path==='/cart')page=<Cart/>;else if(path==='/checkout')page=<Checkout/>;else if(path==='/track')page=<Track/>;else if(path==='/contact')page=<Contact/>
return <><Nav path={path}/><main key={path} className="page">{page}</main><Footer/></>}
