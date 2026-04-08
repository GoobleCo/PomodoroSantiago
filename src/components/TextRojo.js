
//el que importe react o * from react es panchito
/* const TextRojo = ({ children, className = '' }) => {
    return (
        <span style={{ color: 'red' }} className={className}>
            {children}
        </span>
    );
};

export default TextRojo; */

import  {Text} from 'react-native';
export default function TextRojo ({texto}){
    return<Text style={{color:'red'}}>{texto}</Text>
}