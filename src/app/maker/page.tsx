import AddMichiForm from '@/components/AddMichiForm'

export default function Page() {
  return (
    <div className="flex w-2/6 flex-col justify-center space-y-5 text-center">
      <div className="p-14">
        <h1>Michi Maker</h1>
      </div>
      <AddMichiForm />
    </div>
  )
}
