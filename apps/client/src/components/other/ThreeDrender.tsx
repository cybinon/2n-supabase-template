import { Box } from '@chakra-ui/react';
import { useEffect } from "react";
import * as THREE from 'three';

export default function ThreeDrender() {
  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(document.getElementById("c")?.parentElement?.clientWidth || 0, document.getElementById("c")?.parentElement?.clientHeight || 0);
    renderer.setAnimationLoop(animation);
    document.getElementById("c")?.hasChildNodes() ? document.getElementById("c")?.removeChild(document.getElementById("c")?.firstChild!) : null;
    document.getElementById("c")?.appendChild(renderer.domElement);

    function animation(time: any) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
      renderer.render(scene, camera);
    }
  }, []);

  return (
    <Box bg="teal" height={"30vh"} mx="auto" width={"100%"}>
      <Box position={"relative"} id="c"></Box>
    </Box>
  )
}