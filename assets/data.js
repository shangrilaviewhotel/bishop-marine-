const site = {
  name: 'Bishop Marine Academy',
  shortName: 'Bishop Marine Academy',
  legalName: 'Bishop Marine Services',
  rc: 'RC: 7344601',
  address: 'No. 21 Chief Amadi Street, Mile 4 Market Bus Stop, Port Harcourt, Rivers State, Nigeria',
  phones: ['08037776677', '08071746110'],
  whatsapp: '2348037776677',
  website: 'https://bishopmarineservices.com',
  email: '',
  hours: '',
  description: 'Practical vocational, technical and engineering skills training for people preparing for the modern workforce.',
  destinations: ['Poland', 'Denmark', 'Serbia', 'Luxembourg', 'Bulgaria', 'Romania']
};

const categories = [
  'Heavy Equipment Operations', 'HSE & Safety', 'Driving', 'Electrical',
  'Construction Skills', 'Technical Skills', 'Marine/Industrial Skills', 'Other Training'
];

const courses = [
  {slug:'crane-operations',name:'Crane Operations',category:'Heavy Equipment Operations',short:'Practical crane-operation training with safety and assessment foundations.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Crane operation fundamentals','Worksite safety practices','Practical equipment training','Assessment preparation'],certification:'Details to be supplied by the academy',price:'',featured:true},
  {slug:'forklift-operations',name:'Forklift Operations',category:'Heavy Equipment Operations',short:'Forklift operator training focused on safe practical operation.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Forklift operating fundamentals','Pre-use safety checks','Safe load handling','Practical assessment preparation'],certification:'Details to be supplied by the academy',price:'',featured:true},
  {slug:'hse-level-1',name:'HSE Level 1',category:'HSE & Safety',short:'Entry-level health, safety and environment training.',duration:'To be confirmed',requirements:'To be confirmed',learn:['HSE fundamentals','Workplace hazard awareness','Basic safety practices'],certification:'Details to be supplied by the academy',price:''},
  {slug:'hse-level-2',name:'HSE Level 2',category:'HSE & Safety',short:'Intermediate HSE training for developing safety competence.',duration:'To be confirmed',requirements:'To be confirmed',learn:['HSE principles','Risk awareness','Safety management fundamentals'],certification:'Details to be supplied by the academy',price:''},
  {slug:'hse-level-3',name:'HSE Level 3',category:'HSE & Safety',short:'Advanced HSE learning pathway for workplace safety development.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Advanced HSE concepts','Workplace risk controls','Safety leadership foundations'],certification:'Details to be supplied by the academy',price:''},
  {slug:'advanced-hse',name:'Advanced HSE',category:'HSE & Safety',short:'Advanced health, safety and environment training.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Advanced safety concepts','Risk-control principles','Safety programme foundations'],certification:'Details to be supplied by the academy',price:''},
  {slug:'electrical-training',name:'Electrical Training',category:'Electrical',short:'Practical electrical skills development.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Electrical fundamentals','Practical installation concepts','Safety practices'],certification:'Details to be supplied by the academy',price:''},
  {slug:'driving-school',name:'Driving School',category:'Driving',short:'Driving instruction covering practical and road-safety foundations.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Driving fundamentals','Road safety','Practical driving preparation'],certification:'Details to be supplied by the academy',price:''},
  {slug:'aquaculture',name:'Aquaculture',category:'Marine/Industrial Skills',short:'Aquaculture skills training.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Aquaculture fundamentals','Practical skills development'],certification:'Details to be supplied by the academy',price:''},
  {slug:'excavator-operations',name:'Excavator Operations',category:'Heavy Equipment Operations',short:'Excavator operator training with practical safety foundations.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Excavator fundamentals','Safe equipment operation','Practical training'],certification:'Details to be supplied by the academy',price:''},
  {slug:'scaffolding',name:'Scaffolding',category:'Construction Skills',short:'Scaffolding skills and safe-work training.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Scaffolding fundamentals','Safe setup principles','Worksite safety'],certification:'Details to be supplied by the academy',price:''},
  {slug:'spray-painting',name:'Spray Painting',category:'Technical Skills',short:'Practical spray-painting skills development.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Surface preparation','Spray-painting fundamentals','Safe work practices'],certification:'Details to be supplied by the academy',price:''},
  {slug:'pipe-fittings',name:'Pipe Fittings',category:'Construction Skills',short:'Pipe-fitting skills for technical and construction environments.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Pipe-fitting fundamentals','Tools and materials','Practical fitting work'],certification:'Details to be supplied by the academy',price:''},
  {slug:'plumbing-skills',name:'Plumbing Skills',category:'Construction Skills',short:'Practical plumbing skills training.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Plumbing fundamentals','Tools and materials','Practical installation concepts'],certification:'Details to be supplied by the academy',price:''},
  {slug:'fire-fitting',name:'Fire Fitting',category:'Construction Skills',short:'Fire-fitting skills training.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Fire-fitting fundamentals','Safety practices','Practical skills development'],certification:'Details to be supplied by the academy',price:''},
  {slug:'truck-driving',name:'Truck Driving',category:'Driving',short:'Truck-driving training foundations.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Truck-driving fundamentals','Vehicle safety','Road-safety practices'],certification:'Details to be supplied by the academy',price:''},
  {slug:'payloader-operations',name:'Payloader Operations',category:'Heavy Equipment Operations',short:'Payloader operator training.',duration:'To be confirmed',requirements:'To be confirmed',learn:['Payloader fundamentals','Safe operation','Practical equipment training'],certification:'Details to be supplied by the academy',price:''}
];

const faqs = [
 ['What courses do you offer?','The academy currently lists crane, forklift, HSE, electrical, driving, aquaculture, excavator, scaffolding, spray painting, pipe fitting, plumbing, fire fitting, truck driving and payloader training.'],
 ['How do I register?','Use the Admissions page to submit an enquiry. The academy can then provide current course requirements, dates and fees.'],
 ['Where is the academy located?',site.address],
 ['Do you provide practical training?','The supplied academy material describes vocational, technical and engineering skills training. Exact practical schedules should be confirmed with the academy.'],
 ['How long does training take?','Course durations are currently marked for confirmation and should be supplied by the academy.'],
 ['Do you provide certificates?','Certification details are structured on the site but the issuing body and exact award should be confirmed before publication.'],
 ['Is accommodation available?','The supplied promotional material states that accommodation is available. Details and availability should be confirmed with the academy.'],
 ['Do you assist with international opportunities?','The supplied material lists international opportunity/working-visa services for several countries. These are information and application-support areas, not guarantees of employment or visa approval.']
];

const gallery = [
  {title:'Academy training',src:'',alt:'Bishop Marine Academy training'},
  {title:'Heavy equipment training',src:'',alt:'Heavy equipment training'},
  {title:'Forklift training',src:'',alt:'Forklift operator training'},
  {title:'Crane training',src:'',alt:'Crane operations training'}
];

const testimonials = [];
