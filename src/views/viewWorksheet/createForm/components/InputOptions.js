import Options from './subComponents/Options'

export default function InputOptions(props) {

    const { type,name } = props;
 

    


    return (
        <>

            {type === 'radio' || type === 'select' || type === 'checkbox' ? <Options name={name} type={type} /> : <h6> {type} </h6>}
        </>
    )

}