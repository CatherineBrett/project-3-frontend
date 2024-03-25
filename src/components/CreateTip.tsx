import { SyntheticEvent, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


export default function CreateTip() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        cohort: "",
        emoji: "",
        heading: "",
        tip: "",
    })

    function handleChange(e: any) {
        const fieldName = e.target.name
        const newFormData = structuredClone(formData)
        newFormData[fieldName as keyof typeof formData] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        const resp = await axios.post('/api/tips', formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(resp.data)
        navigate('/advice') // add advice list page location here
    }


    return (
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <div>
                <input
                  type="text"
                  name={"name"}
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
            </div>
            <div>
              <label>Cohort</label>
              <div>
                <input
                  type="text"
                  name={"cohort"}
                  onChange={handleChange}
                  value={formData.cohort}
                />
              </div>
            </div>
            <div>
              <label>Emoji</label>
              <div>
                <input
                  type="text"
                  name={"emoji"}
                  onChange={handleChange}
                  value={formData.emoji}
                />
              </div>
            </div>
            <div>
              <label>Heading</label>
              <div>
                <input
                  type="text"
                  name={"heading"}
                  onChange={handleChange}
                  value={formData.heading}
                />
              </div>
            </div>
            <div>
              <label>Advice</label>
              <div>
                <input
                  type="text"
                  name={"tip"}
                  onChange={handleChange}
                  value={formData.tip}
                />
              </div>
            </div>

            <button>Submit</button>
          </form>
          <div className="h-dvh">
            <h1 className="items=center text-center ">
              Welcome to the Create-Advice Page!
            </h1>
          </div>
        </div>
      </div>
    );
}