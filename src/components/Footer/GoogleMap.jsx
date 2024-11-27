import {APIProvider, Map, AdvancedMarker} from '@vis.gl/react-google-maps';

const GoogleMap = () => {

  const retrosanat72 = {lat: 37.89558045879373, lng:41.14188315458666 }

    // Yol tarifi URL'sine yönlendirme işlevi
    const handleMarkerClick = () => {
      const destination = `${retrosanat72.lat},${retrosanat72.lng}`;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
      window.open(url, '_blank'); // Yeni sekmede aç
    };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{width: '480px', height: '320px'}}
        defaultCenter={retrosanat72}
        defaultZoom={14}
        gestureHandling={'greedy'}
        disableDefaultUI={false}
        // Projeden alınan proje Id numarası buraya eklenir
        mapId={"retrosanat"}
      >
        <AdvancedMarker position={retrosanat72} onClick={handleMarkerClick} title={"Tıkla: Retro Sanat'a rota oluştur"} />
      </Map>
    </APIProvider>
  );
}

export default GoogleMap