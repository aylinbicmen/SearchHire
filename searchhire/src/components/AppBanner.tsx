
export default function AppBanner(props:{imageName:string,title:string,description:string}) {

    return (
        <div className="d-flex justify-content-center m-3">
            <div className="card p-2" style={{maxWidth:"550px"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={require(`../images/${props.imageName}`)} alt="bannerImage" className="img-fluid rounded-start"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body mt-2">
                            <h5 className="card-title c-title">{props.title}</h5>
                            <p className="card-text c-text">{props.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}