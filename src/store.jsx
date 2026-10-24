import {createContext,useContext,useEffect,useState} from 'react'
import {PRODUCTS,ORDERS} from './data'
const C=createContext()
export const useStore=()=>useContext(C)
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
export const money=n=>'$'+Number(n).toFixed(2)
export function Provider({children}){
const [products,setProducts]=useState(()=>load('mx_p2',PRODUCTS))
const [cart,setCart]=useState(()=>load('mx_c',[]))
const [orders,setOrders]=useState(()=>load('mx_o',ORDERS))
const [admin,setAdmin]=useState(()=>load('mx_a',false))
const [cartOpen,setCartOpen]=useState(false)
useEffect(()=>{localStorage.setItem('mx_p2',JSON.stringify(products))},[products])
useEffect(()=>{localStorage.setItem('mx_c',JSON.stringify(cart))},[cart])
useEffect(()=>{localStorage.setItem('mx_o',JSON.stringify(orders))},[orders])
useEffect(()=>{localStorage.setItem('mx_a',JSON.stringify(admin))},[admin])
const addToCart=(p,size)=>setCart(c=>{const i=c.findIndex(x=>x.id===p.id&&x.size===size);
 if(i>-1)return c.map((x,j)=>j===i?{...x,qty:x.qty+1}:x);return [...c,{id:p.id,name:`${p.brand} ${p.name}`.toUpperCase(),img:p.img,price:p.price,size,qty:1}]})
const qty=(i,d)=>setCart(c=>c.map((x,j)=>j===i?{...x,qty:Math.max(1,x.qty+d)}:x))
const remove=i=>setCart(c=>c.filter((_,j)=>j!==i))
const total=cart.reduce((s,x)=>s+x.price*x.qty,0), count=cart.reduce((s,x)=>s+x.qty,0)
const placeOrder=info=>{const id='MTX-'+(1000+orders.length+1+Math.floor(Math.random()*90))
 setOrders(o=>[{id,...info,total,status:'Pending',items:cart.map(({name,size,qty,price})=>({name,size,qty,price}))},...o]);setCart([]);return id}
return <C.Provider value={{products,setProducts,cart,orders,setOrders,admin,setAdmin,cartOpen,setCartOpen,addToCart,qty,remove,total,count,placeOrder}}>{children}</C.Provider>}
