import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

export const navbarData = [
    {
        id: 1,
        title: 'Les Tuyos',
        path: '/tuyos',
        icon: <FaIcons.FaLightbulb />,
    },
    {
        id: 2,
        title: 'Nouveau Tuyo',
        path: '/ajouter-tuyo',
        icon: <AiIcons.AiOutlinePlusCircle />,
    },
    {
        id: 3,
        title: 'Itinéraire',
        path: '/itineraire',
        icon: <FaIcons.FaRegMap />,
    },
    {
        id: 4,
        title: 'Carte',
        path: '/carte',
        icon: <FaIcons.FaMapMarkerAlt />,
    },
    {
        id: 5,
        title: 'Contact',
        path: '/contact',
        icon: <AiIcons.AiOutlineMail />,
    }
]