import Image from "next/image";
import badge from "@/assets/images/Badge.svg";

export default function GetStart(){
    return(
        <section>
            <Image className='mx-auto my-[15vh]' src={badge} alt='badge' width='50' height='50' />
            <div className="bgItems flex justify-center items-center flex-col gap-5 py-[5vh] h-[60vh]">
                <h2 className='text-center mb-[5vh] text-6xl font-bold'>Get <span className='bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text' >Start</span></h2>
                <small>this is the test</small>
                <button className="mx-auto p-2 rounded-2xl border bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-stone-900">Get Start</button>x
                
            </div>
        </section>
    )
}