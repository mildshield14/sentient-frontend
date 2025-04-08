import { useEffect, useState, useRef } from 'react';

export default function useEmotionDetector() {
    const [emotion, setEmotion] = useState('neutral');
    const webcamRef = useRef<any>(null);

    useEffect(() => {
        const init = async () => {
            const URL = 'https://teachablemachine.withgoogle.com/models/MvH1lVLDw/';
            const modelURL = URL + 'model.json';
            const metadataURL = URL + 'metadata.json';

            const model = await (window as any).tmImage.load(modelURL, metadataURL);
            const webcam = new (window as any).tmImage.Webcam(200, 200, true);
            await webcam.setup();
            await webcam.play();
            webcamRef.current = webcam;

            requestAnimationFrame(loop);

            async function loop() {
                webcam.update();
                const prediction = await model.predict(webcam.canvas);
                const best = prediction.reduce((a: any, b: any) => (a.probability > b.probability ? a : b));
                setEmotion(best.className);
                requestAnimationFrame(loop);
            }
        };

        init();
    }, []);

    return { emotion, webcamRef };
}