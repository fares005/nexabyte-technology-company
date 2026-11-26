
import {Suspense,useEffect,useMemo,useRef,useState} from 'react'
import {Canvas,useFrame} from '@react-three/fiber'
import {Float,OrbitControls,Stars} from '@react-three/drei'
import {motion,useInView,useMotionValue,useSpring,useTransform} from 'framer-motion'
import Lenis from 'lenis'
import {
 ArrowRight,BadgeCheck,Blocks,Bot,BriefcaseBusiness,Briefcase,CheckCircle2,ChevronRight,
 Cloud,Code2,Database,Globe2,Headphones,Layers3,Mail,MapPin,Menu,MonitorSmartphone,
 Moon,Phone,Send,ServerCog,ShieldCheck,Smartphone,Sparkles,Sun,Workflow,X,Zap,
 BookOpen,Users,BarChart3,Building2,PlayCircle,ExternalLink
} from 'lucide-react'

const services=[
 [Globe2,'Web Development','Corporate websites, portals, e-commerce and scalable web applications.'],
 [Smartphone,'Android & iOS Apps','Native and cross-platform mobile apps designed for performance and growth.'],
 [MonitorSmartphone,'Desktop Software','Reliable desktop applications and internal tools for modern teams.'],
 [Database,'Business Systems','CRM, ERP, dashboards, management systems and custom operational platforms.'],
 [Cloud,'Cloud & Backend','Secure APIs, databases, hosting, cloud infrastructure and system integrations.'],
 [Workflow,'Automation','Workflow automation, synchronization and process optimization.'],
 [Bot,'AI Solutions','AI assistants, intelligent search, automation and data-driven features.'],
 [Layers3,'UI/UX Design','Product strategy, wireframes, prototypes and polished interfaces.'],
 [ShieldCheck,'Security & Maintenance','Monitoring, updates, optimization, protection and long-term support.']
]

const serviceDetails={
 'Web Development':['Corporate websites','E-commerce','Web portals','Progressive web apps'],
 'Android & iOS Apps':['Flutter','React Native','Kotlin','Swift'],
 'Desktop Software':['Windows tools','macOS applications','Internal systems','Cross-platform apps'],
 'Business Systems':['CRM','ERP','Dashboards','Operations platforms'],
 'Cloud & Backend':['APIs','Databases','Cloud hosting','Integrations'],
 'Automation':['Workflow automation','Data sync','Notifications','Process optimization'],
 'AI Solutions':['AI assistants','Smart search','Document processing','Automation'],
 'UI/UX Design':['Research','Wireframes','Prototypes','Design systems'],
 'Security & Maintenance':['Monitoring','Updates','Performance','Technical support']
}

const sectors=['Retail & E-commerce','Education','Healthcare','Finance','Logistics','Hospitality','Public Services','Startups']
const technologies=['React','Next.js','Node.js','Flutter','React Native','Kotlin','Swift','Firebase','Python','Laravel','PostgreSQL','Cloud']
const timeline=[
 ['Foundation','Company milestone to be confirmed','Add the verified founding year and story here.'],
 ['Expansion','Service milestone to be confirmed','Add when mobile, cloud or other capabilities were introduced.'],
 ['Today','Full-service technology vision','Web, mobile, software, cloud, automation, AI and support.'],
 ['Next','International growth','Add verified expansion plans and target markets.']
]
const cases=[
 {tag:'Business platform',title:'Business Management Platform',desc:'A modern dashboard concept for business operations, analytics, reporting and management.',stack:['Web','Cloud','Dashboard'],image:'/business-management-platform.png'},
 {tag:'Mobile application',title:'Mobile Service Application',desc:'A polished Android and iOS service-booking experience with technician tracking and customer workflows.',stack:['Android','iOS','API'],image:'/mobile-service-application.png'},
 {tag:'Automation system',title:'Process Automation System',desc:'An industrial automation concept combining operational monitoring, workflow analytics and performance tracking.',stack:['Automation','Database','Integration'],image:'/process-automation-system.png'}
]
const posts=[
 ['Product Engineering','How to plan a digital product before development begins'],
 ['Mobile Development','Choosing between native and cross-platform mobile apps'],
 ['Business Automation','Where automation creates the most operational value']
]

function Loader({done}){return <motion.div className="loader" animate={{opacity:done?0:1}} transition={{duration:.7}} style={{pointerEvents:done?'none':'auto'}}><motion.img src="/nexabyte-logo.png" initial={{scale:.8,opacity:0}} animate={{scale:1,opacity:1}}/><motion.div className="loader-line" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:1.3}}/><span>Building digital systems…</span></motion.div>}
function Core(){const r=useRef();useFrame((s,d)=>{r.current.rotation.x+=d*.12;r.current.rotation.y+=d*.2;r.current.position.y=Math.sin(s.clock.elapsedTime*.9)*.15});return <group ref={r}><mesh><icosahedronGeometry args={[1.55,1]}/><meshStandardMaterial color="#0d7cf2" wireframe metalness={.5}/></mesh><mesh scale={.68}><icosahedronGeometry args={[1.55,2]}/><meshStandardMaterial color="#27c8ff" emissive="#0a7cff" emissiveIntensity={1.2} transparent opacity={.72}/></mesh></group>}
function Node({position,color='#46c8ff'}){const r=useRef();useFrame(s=>{r.current.rotation.y=s.clock.elapsedTime*.6});return <Float speed={2.2} rotationIntensity={1.2}><mesh ref={r} position={position}><octahedronGeometry args={[.22,0]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4}/></mesh></Float>}
function HeroScene(){return <Canvas camera={{position:[0,0,6],fov:45}} dpr={[1,1.5]}><ambientLight intensity={1.2}/><pointLight position={[4,4,5]} intensity={25} color="#5bd9ff"/><pointLight position={[-4,-3,3]} intensity={18} color="#0a64ff"/><Stars radius={40} depth={18} count={650} factor={2.2} fade/><Core/><Node position={[2.4,1.1,0]}/><Node position={[-2.2,-1.2,.4]}/><Node position={[1.7,-1.9,-.6]}/><OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.55}/></Canvas>}
function Tilt({children}){const x=useMotionValue(0),y=useMotionValue(0);const rx=useSpring(useTransform(y,[-.5,.5],[7,-7]));const ry=useSpring(useTransform(x,[-.5,.5],[-7,7]));return <motion.div className="service-wrap" onMouseMove={e=>{const b=e.currentTarget.getBoundingClientRect();x.set((e.clientX-b.left)/b.width-.5);y.set((e.clientY-b.top)/b.height-.5)}} onMouseLeave={()=>{x.set(0);y.set(0)}} style={{rotateX:rx,rotateY:ry,transformPerspective:1000}}>{children}</motion.div>}
function Assistant(){
 const [open,setOpen]=useState(false),[messages,setMessages]=useState([{from:'bot',text:'Hello. What would you like Nexabyte to build?'}]),[text,setText]=useState('')
 const reply=q=>{
  const l=q.toLowerCase()
  if(l.includes('android')||l.includes('ios')||l.includes('mobile')) return 'Nexabyte can plan, design and build Android and iOS applications, including backend APIs and launch support.'
  if(l.includes('erp')||l.includes('crm')||l.includes('business')) return 'Nexabyte can build custom CRM, ERP, dashboard and business management systems around your workflows.'
  if(l.includes('web')||l.includes('site')) return 'Nexabyte provides corporate websites, portals, e-commerce and scalable web applications.'
  if(l.includes('price')||l.includes('cost')) return 'Pricing depends on scope, platforms, integrations and timeline. Send a project inquiry for a tailored estimate.'
  return 'Nexabyte offers web, mobile, desktop software, cloud, automation, AI, UI/UX and maintenance. Please describe your project in more detail.'
 }
 const send=()=>{if(!text.trim())return;const q=text;setMessages(m=>[...m,{from:'user',text:q},{from:'bot',text:reply(q)}]);setText('')}
 return <><button className="chat-fab" onClick={()=>setOpen(!open)}><Bot/></button>{open&&<div className="chatbox"><div className="chathead"><b>Nexabyte Assistant</b><button onClick={()=>setOpen(false)}><X/></button></div><div className="messages">{messages.map((m,i)=><div key={i} className={m.from}>{m.text}</div>)}</div><div className="chatinput"><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about a service..."/><button onClick={send}><Send/></button></div></div>}</>
}

export default function App(){
 const [menu,setMenu]=useState(false),[loaded,setLoaded]=useState(false),[dark,setDark]=useState(false),[active,setActive]=useState(services[0][1])
 useEffect(()=>{const lenis=new Lenis({duration:1.05});let id;const raf=t=>{lenis.raf(t);id=requestAnimationFrame(raf)};id=requestAnimationFrame(raf);const timer=setTimeout(()=>setLoaded(true),1500);return()=>{cancelAnimationFrame(id);lenis.destroy();clearTimeout(timer)}},[])
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light'},[dark])
 const detail=serviceDetails[active]
 const submit=e=>{e.preventDefault();const d=new FormData(e.currentTarget);location.href=`mailto:mohamedmouheb@gmail.com?subject=${encodeURIComponent('Nexabyte project inquiry')}&body=${encodeURIComponent(`Name: ${d.get('name')}\nCompany: ${d.get('company')}\nEmail: ${d.get('email')}\nService: ${d.get('service')}\n\n${d.get('message')}`)}`}
 return <div><Loader done={loaded}/><header><nav className="container nav"><a className="brand" href="#home"><img src="/nexabyte-logo.png"/><div><strong>Nexabyte</strong><span>Technology</span></div></a><div className={'navlinks '+(menu?'open':'')}><a href="#company">Company</a><a href="#services">Services</a><a href="#work">Work</a><a href="#insights">Insights</a><a href="#contact">Contact</a></div><div className="nav-actions"><button className="theme" onClick={()=>setDark(!dark)}>{dark?<Sun/>:<Moon/>}</button><a className="cta navcta" href="#contact">Request consultation</a><button className="menubtn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></nav></header>
 <main>
  <section className="hero" id="home"><div className="grid-overlay"/><div className="container hero-grid"><motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:.3}}><div className="kicker"><Sparkles/> Full-service technology company</div><h1>Everything digital.<br/><span>One technology partner.</span></h1><p className="lead">Websites, Android and iOS apps, desktop software, cloud systems, AI, automation and complete business platforms.</p><div className="hero-actions"><a className="cta magnetic" href="#contact">Start a project <ArrowRight/></a><a className="secondary" href="#services">Explore capabilities</a></div><div className="hero-checks"><span><CheckCircle2/> End-to-end delivery</span><span><CheckCircle2/> Multi-platform engineering</span><span><CheckCircle2/> Long-term support</span></div></motion.div><div className="hero-scene"><Suspense fallback={null}><HeroScene/></Suspense><div className="scene-label label-a"><Smartphone/> Mobile</div><div className="scene-label label-b"><Cloud/> Cloud</div><div className="scene-label label-c"><Code2/> Software</div></div></div></section>

  <section className="dashboard-strip"><div className="container dash-grid"><div><BarChart3/><strong>Capabilities</strong><span>Web, mobile, cloud, AI and software</span></div><div><Users/><strong>Flexible delivery</strong><span>From concept to support</span></div><div><Building2/><strong>Company solutions</strong><span>Built around real operations</span></div><div><Headphones/><strong>Ongoing support</strong><span>Maintenance and evolution</span></div></div></section>

  <section className="section container company-grid" id="company"><div><div className="section-label">Who we are</div><h2>A complete technology company—not just a development supplier.</h2></div><div className="company-copy"><p>Nexabyte Technology is a Tunisia-based software and digital solutions company founded and led by <strong>Mohamed Mouheb Ben Othman</strong>.</p><p>We cover strategy, design, engineering, deployment, integration, maintenance and continuous improvement.</p><div className="company-points"><span><BadgeCheck/> Business-driven technology</span><span><BadgeCheck/> Custom solutions</span><span><BadgeCheck/> Multi-platform engineering</span><span><BadgeCheck/> Continuous support</span></div></div></section>

  <section className="timeline-section"><div className="container"><div className="section-label">Company timeline</div><h2>Milestones that can grow with Nexabyte.</h2><div className="timeline">{timeline.map((x,i)=><motion.div key={i} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}><span>{String(i+1).padStart(2,'0')}</span><div><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div></motion.div>)}</div></div></section>

  <section className="section services-section" id="services"><div className="container"><div className="section-head"><div><div className="section-label">Capabilities</div><h2>Everything related to software and digital technology.</h2></div><p>One team to design, build, connect, launch and support your ecosystem.</p></div><div className="service-grid">{services.map(([Icon,t,d],i)=><Tilt key={t}><article className="service-card"><div className="service-top"><div className="service-icon"><Icon/></div><span>{String(i+1).padStart(2,'0')}</span></div><h3>{t}</h3><p>{d}</p><button onClick={()=>setActive(t)}>Explore <ChevronRight/></button></article></Tilt>)}</div>
   <div className="service-explorer"><div><div className="section-label">Interactive service explorer</div><h2>{active}</h2><p>Select any service card to explore typical deliverables.</p></div><div className="deliverables">{detail.map(x=><span key={x}><CheckCircle2/>{x}</span>)}</div></div>
  </div></section>

  <section className="section container storytelling"><div className="story-intro"><div className="section-label">How value is created</div><h2>Understand. Design. Build. Launch. Improve.</h2></div>{['We understand your business and users.','We design the product and technical architecture.','We build and test the complete solution.','We launch, monitor and keep improving it.'].map((x,i)=><motion.div className="story-step" key={x} initial={{opacity:.2,scale:.96}} whileInView={{opacity:1,scale:1}} viewport={{amount:.65}}><span>0{i+1}</span><h3>{x}</h3></motion.div>)}</section>

  <section className="section work-section" id="work"><div className="container"><div className="section-head"><div><div className="section-label">Case studies</div><h2>Show the problem, solution and real result.</h2></div><p>These are honest templates until verified Nexabyte projects and metrics are added.</p></div><div className="case-grid">{cases.map((c,i)=><article className="case-card" key={c.title}><div className="case-visual"><img src={c.image} alt={c.title}/><span>{c.tag}</span></div><div className="case-body"><h3>{c.title}</h3><p>{c.desc}</p><div>{c.stack.map(s=><span key={s}>{s}</span>)}</div></div></article>)}</div></div></section>

  <section className="map-section"><div className="container map-grid"><div><div className="section-label">Our location</div><h2>Based in Tunis, Tunisia.</h2><p>Nexabyte Technology operates from Tunis and collaborates with clients digitally.</p><div className="location-card"><span><MapPin/> R4QF+CG2, Tunis, Tunisia</span><a href="https://www.google.com/maps/search/?api=1&query=R4QF%2BCG2%2C%20Tunis%2C%20Tunisia" target="_blank" rel="noreferrer">View on Google Maps <ExternalLink/></a></div></div><div className="map-embed"><iframe title="Nexabyte Technology location" src="https://www.google.com/maps?q=R4QF%2BCG2%2C%20Tunis%2C%20Tunisia&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div></div></section>

  <section className="tech-section"><div className="container"><div className="section-label">Technology stack</div><div className="tech-marquee"><div>{[...technologies,...technologies].map((x,i)=><span key={i}>{x}</span>)}</div></div></div></section>

  <section className="section insights" id="insights"><div className="container"><div className="section-head"><div><div className="section-label">Insights</div><h2>A foundation for Nexabyte’s future blog.</h2></div><p>Publishing useful technical content can improve credibility and search visibility.</p></div><div className="post-grid">{posts.map(p=><article><BookOpen/><span>{p[0]}</span><h3>{p[1]}</h3><a href="#contact">Article placeholder <ArrowRight/></a></article>)}</div></div></section>

  <section className="careers-section"><div className="container careers-grid"><div><div className="section-label light">Careers</div><h2>Build the future with Nexabyte.</h2><p>No open roles are claimed. This section can later display verified vacancies.</p></div><div className="career-box"><Briefcase/><b>Future opportunities</b><span>Frontend • Backend • Mobile • UI/UX • QA</span><a href="mailto:mohamedmouheb@gmail.com">Send a spontaneous application</a></div></div></section>

  <section className="section container leadership">
    <motion.div className="leader-card founder-spotlight" initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
      <div className="founder-photo-wrap">
        <div className="founder-glow"/>
        <img className="founder-photo" src="/mohamed-mouheb-ben-othman.png" alt="Mohamed Mouheb Ben Othman"/>
        <span className="founder-badge">Founder & CEO</span>
      </div>
      <div className="founder-copy">
        <div className="section-label">Leadership</div>
        <h2>Mohamed Mouheb Ben Othman</h2>
        <p className="role">Founder & Owner, Nexabyte Technology</p>
        <p>Leading Nexabyte’s vision, partnerships and delivery of practical technology solutions across web, mobile, software, cloud, automation and AI.</p>
        <div className="expertise-badges">
          <span>Software Engineering</span><span>Mobile Apps</span><span>Web Platforms</span>
          <span>Cloud Solutions</span><span>AI & Automation</span><span>Digital Transformation</span>
        </div>
      </div>
      <div className="leader-contact premium-contact">
        <a href="mailto:mohamedmouheb@gmail.com"><Mail/> <span><b>Email</b>mohamedmouheb@gmail.com</span></a>
        <a href="tel:+21641779455"><Phone/> <span><b>Phone</b>+216 41 779 455</span></a>
        <a href="https://www.google.com/maps/search/?api=1&query=R4QF%2BCG2%2C%20Tunis%2C%20Tunisia" target="_blank" rel="noreferrer"><MapPin/> <span><b>Location</b>R4QF+CG2, Tunis, Tunisia</span></a>
      </div>
    </motion.div>
  </section>

  <section className="contact-section" id="contact"><div className="container contact-grid"><div><div className="section-label">Start a conversation</div><h2>Tell us what you want to build.</h2><p>Website, mobile app, custom software, cloud system or complete digital platform.</p></div><form onSubmit={submit}><div className="form-row"><label>Name<input name="name" required/></label><label>Company<input name="company"/></label></div><label>Email<input type="email" name="email" required/></label><label>Service<select name="service">{services.map(s=><option>{s[1]}</option>)}</select></label><label>Project details<textarea name="message" rows="5" required/></label><button className="cta">Send project inquiry <ArrowRight/></button></form></div></section>
 </main>
 <footer><div className="digital-footer"><div className="city">{[...Array(28)].map((_,i)=><i key={i}/>)}</div></div><div className="container footer-grid"><a className="brand" href="#home"><img src="/nexabyte-logo.png"/><div><strong>Nexabyte</strong><span>Technology</span></div></a><p>Complete software, mobile, web and cloud solutions.</p><span>© 2026 Nexabyte Technology</span></div></footer><Assistant/>
 </div>
}
