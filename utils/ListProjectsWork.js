const publicImagesPath = '/projects/work/';

const availableImages = [
    {image:'helpCenter.jpeg', name:'Centro de Ayuda'},
    {image:'supportCenter.jpeg', name:'Centro de Soporte'},
    {image:'vamos-restaurant-1.png', name:'Vamos Restaurantes - Configuración'},
    {image:'vamos-restaurant-2.png', name:'Vamos Restaurantes - Reportes'},
    {image:'vamos-restaurant-3.png', name:'Vamos Restaurantes - Pedidos'},
    {image:'vamos-viajes-1.png', name:'VamosApp - Viajes'},
    {image:'sae-nomina-1.png', name:'SAE Nóminas - Login'},
    {image:'sae-nomina-2.png', name:'SAE Nóminas - Inicio'},
    {image:'sae-nomina-3.png', name:'SAE Nóminas - Emisión'},
    {image:'sae-control-acceso.png', name:'SAE Control de Acceso - Dashboard'}
];

const projectsWork = availableImages.map(({ image, name }) => ({
  name,
  imagePath: `${publicImagesPath}${image}`
}));

export default projectsWork;