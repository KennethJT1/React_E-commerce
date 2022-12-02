export default function Jumbotron({title, subtitle= "Welcome to React E-commerce"}){
    return (
        <div className="container-fluid bg-primary">
        <div class="row">
        <div class="col text-center p-5 bg-light">
        <h1>{title}</h1>
        <p class="lead">{subtitle}</p>
        </div>
        </div>
        </div>
    )
}