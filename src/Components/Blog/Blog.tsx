import fundoFixoBlog from "../../assets/images/ImgFixaBlog.jpg"


export default function Blog(){
    return(
        <div className="bg-[#fdfaf0] min-h-screen font-fontePrincipal">
            <div className="h-[40vh]">
                <img src={fundoFixoBlog} alt="fundo blog" className="h-full w-full object-cover"/>
            </div>
            <div className="text-textoPequenoChat px-paddingXSecao py-4">
                Publicado em 12/12/24
            </div>
            <div className="flex flex-col gap-6 px-[20vw] py-4">
                <div className="text-textoH1 font-bold flex justify-center mb-4">
                    Titulo Blog
                </div>
                <div className="text-textoPadrao">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil ipsam sequi delectus mollitia corrupti autem consequuntur impedit nisi facilis perferendis, 
                    labore quam illum eum, at aliquid eligendi. Vel, expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil ipsam sequi delectus mollitia corrupti autem consequuntur impedit nisi facilis perferendis, 
                    labore quam illum eum, at aliquid eligendi. Vel, expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil ipsam sequi delectus mollitia corrupti autem consequuntur impedit nisi facilis perferendis, 
                    labore quam illum eum, at aliquid eligendi. Vel, expedita
                </div>
                <div className="text-textoPadrao">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil ipsam sequi delectus mollitia corrupti autem consequuntur impedit nisi facilis perferendis, 
                    labore quam illum eum, at aliquid eligendi. Vel, expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil ipsam sequi delectus mollitia corrupti autem consequuntur impedit nisi facilis perferendis, 
                    labore quam illum eum, at aliquid eligendi. Vel, expedita? Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore nihil ipsam sequi delectus mollitia corrupti autem consequuntur impedit nisi facilis perferendis, 
                    labore quam illum eum, at aliquid eligendi. Vel, expedita
                </div>
            </div>
        </div>
    )
}