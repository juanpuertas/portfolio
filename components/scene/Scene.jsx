import { Box } from '@mui/material';
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Scene = () => {
    const mountRef = useRef(null);
    const mixerRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);

        // Loader para el modelo GLTF
        const loader = new GLTFLoader();
        loader.load(
            '/scene.gltf',
            (gltf) => {
                scene.add(gltf.scene);
                // Ajusta la posición y escala del modelo
                gltf.scene.position.set(0, 0, 0);
                gltf.scene.scale.set(2.5, 2, 2.5);

                // Centra la cámara en el modelo
                const box = new THREE.Box3().setFromObject(gltf.scene);
                const center = box.getCenter(new THREE.Vector3());
                controls.target.copy(center);
                camera.position.set(center.x + 7, center.y + 2, center.z  - 5);
                controls.update();

                // Configurar la animación
                if (gltf.animations && gltf.animations.length) {
                    mixerRef.current = new THREE.AnimationMixer(gltf.scene);
                    const action = mixerRef.current.clipAction(gltf.animations[0]);
                    action.play();
                }
            },
            undefined,
            (error) => {
                console.error('An error happened', error);
            }
        );

        // Añadir luces
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);
        
        const clock = new THREE.Clock();
        let frame;
        const animate = () => {
            const delta = clock.getDelta();
            if (mixerRef.current) {
                mixerRef.current.update(delta);
            }
            renderer.render(scene, camera);
            frame = requestAnimationFrame(animate);
        };

        animate();

        // Ajusta el tamaño del renderizador cuando la ventana cambia de tamaño
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Limpieza
        return () => {
            cancelAnimationFrame(frame);
            controls.dispose();
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            currentMount.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <Box className="Contenedor3D" ref={mountRef} style={{width:'100%', height:'clamp(320px, 55vh, 560px)', background: 'transparent'}}>
        </Box>
    )
}

export default Scene