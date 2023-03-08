


import { AiOutlinePlus } from 'react-icons/ai'

import { Link } from 'react-router-dom'



export default function WorksheetDashboard() {

    return (
        <>
        <div >
            <div className='mx 8' >
                <h1 className=' text-3xl font-light' >My worksheet(table)</h1>
            </div>
            <div className='addworksheet'>
                <div className='bg-grey-medium h-20 w-20 mt-7 ml-9 flex items-center justify-center'>
                    <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to="/worksheet-createWorksheet"
                    >
                        <button>
                            <AiOutlinePlus className='' />
                        </button>
                    </Link>
                </div>
                <p className='mt-3'>Create worksheet(table)</p>
            </div>

        </div>
        </>
    )
}