import EmployeeList from "./components/additional/EmployeeList";
import Header from "./components/main/Header";
import CreateEmployeeForm from "./components/additional/CreateEmployeeForm";

function App() {
  return (
    <div className="h-full">
      <Header />
      <CreateEmployeeForm />
      <EmployeeList />
      <br />
      <br />
    </div>
  );
}

export default App;
