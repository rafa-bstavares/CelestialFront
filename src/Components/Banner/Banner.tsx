import CorpoBanner from "../CorpoBanner/CorpoBanner"
import banner from "../../assets/images/Bannerselestial03.mp4"

export default function Banner(){
    return(
        <div className="flex flex-col relative z-30 ">
            <video src={banner} className="w-screen h-auto absolute top-0 left-0" muted={true} loop={true} autoPlay={true}></video>
            <CorpoBanner/>
        </div>
    )
}