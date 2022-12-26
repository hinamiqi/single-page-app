import * as THREE from 'three';
import { IRoute } from '../models/route.js';

import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    private renderer: THREE.WebGL1Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;

    private pluto: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;

    constructor(route: IRoute) {
        super(route);
    }

    init(): void {
        console.log('Pluto is ready for initialization!');

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGL1Renderer({
            canvas: document.querySelector('#bg'),
            antialias: true,
        });

        console.log(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.setZ(30);
        this.camera.position.setX(-3);

        this.renderer.render(this.scene, this.camera);

        const plutoTexture = new THREE.TextureLoader().load('../../static/image/pluto2.jpg');
        const plutoNormal = new THREE.TextureLoader().load('../../static/image/pluto2_normal.jpg');
        const plutoBump = new THREE.TextureLoader().load('../../static/image/pluto2_bump.jpg');

        this.pluto = new THREE.Mesh(
            new THREE.SphereGeometry(18, 48, 48),
            new THREE.MeshStandardMaterial({ map: plutoTexture, normalMap: plutoNormal, bumpMap: plutoBump })
        );
        this.pluto.position.setY(5);
        this.pluto.position.setX(15);
        this.pluto.position.setZ(-20);
        this.scene.add(this.pluto);


        for (let i = 0; i <= 100; i++) {
            this.addStar();
        }


        const color = 0xFFFFFF;
        const skyColor = 'rgb(179, 244, 255)';
        const groundColor = 'rgb(252, 179, 255)';
        const intensity = 0.3;
        const alight = new THREE.AmbientLight(color, intensity);
        const hlight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        const plight = new THREE.PointLight(color, 0.7);
        plight.position.set(-25, -25, 5);
        this.scene.add(alight, hlight, plight);
        this.scene.add(new THREE.PointLightHelper(plight));

        this.animate();

        (document.getElementsByClassName('main'))[0].addEventListener('scroll', () => {
            this.pluto.rotateY(0.00005);
        });
    }

    animate = (): void => {
        requestAnimationFrame(this.animate);

        this.pluto.rotateX(0.00005);

        this.renderer.render(this.scene, this.camera);
    };

    addStar(): void {
        const g = new THREE.SphereGeometry(0.1);
        const m = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(g, m);

        const [x, y] = Array(2).fill(0).map(() => THREE.MathUtils.randFloatSpread(200));
        star.position.set(x, y, -50);
        this.scene.add(star);
    }
}