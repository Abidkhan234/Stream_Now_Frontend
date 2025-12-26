import { Spinner } from "@/components/ui/spinner"


const loading = () => {
    return (
        <div className="min-h-screen grid place-content-center">
            <Spinner className={`size-14`} />
        </div>
    )
}

export default loading
