import Options  from './subComponents/Options'

export default function InputOptions(props) {

    const {type} = props;

    return(
        <>
       
        {type === 'radio' || type === 'select' || type === 'checkbox' ? <Options type={type} /> :  <h6> {type} </h6>}
        </>
    )

}