const d='Full-face shell with a fog-resistant visor, multi-density EPS liner and a quick-release micro-lock buckle.'
const P=(id,slug,brand,name,price,img)=>({id,slug,brand,name,price,img:`/products/${img}.jpg`,images:[`/products/${img}-l.jpg`],desc:d,sizes:['Small','Medium','Large'],stock:20,cert:'ECE 22.06'})
export const PRODUCTS=[
P(1,'serps-raptor-x','Serps','RAPTOR-X',540,1),P(2,'yamaha-ventura-tour','Yamaha','VENTURA TOUR',389,2),
P(3,'bmw-m-pro','BMW','M PRO',500.5,3),P(4,'ls2-carbon','LS2','CARBON',720,4),
P(5,'shark-gt','Shark','GT',499,5),P(6,'bmw-m-pro-carbon','BMW','M-PRO-CARBON',810,6)]
export const ORDERS=[
{id:'MTX-1001',name:'Ali Khan',email:'ali@mail.com',phone:'0300 1112223',address:'Clifton, Karachi',total:540,status:'Delivered',items:[{name:'SERPS RAPTOR-X',size:'Large',qty:1,price:540}]},
{id:'MTX-1002',name:'Sara Ahmed',email:'sara@mail.com',phone:'0321 4445556',address:'DHA, Lahore',total:889,status:'Processing',items:[{name:'YAMAHA VENTURA TOUR',size:'Medium',qty:1,price:389},{name:'BMW M PRO',size:'Small',qty:1,price:500}]}]
