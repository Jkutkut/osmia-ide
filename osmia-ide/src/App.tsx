import './i18n/i18n.ts'
import './App.css'
import NavbarProjectInfo from './components/navbar/NavbarProjectInfo'

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className='d-flex gap-3'>
            <div>
              <span>Main tab</span>
            </div>
            <div className="d-flex gap-3">
              <div>
                <span>File01</span>
              </div>
              <div>
                <span>File02</span>
              </div>
              <div>
                <span>File03</span>
              </div>
              <div>
                <span>File04</span>
              </div>
              <div>
                <span>File05</span>
              </div>
            </div>
          </div>

          <NavbarProjectInfo />
        </div>
      </nav>
    </>
  )
}

export default App
