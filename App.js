import React, { useState } from "react";

const apiRequests = [
  {
    name: "Get Users",
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: null
  },
  {
    name: "Create Post",
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      title: "foo",
      body: "bar",
      userId: 1
    }
  },
  {
    name: "Get Todos",
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
    body: null
  }
];

function App() {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [response, setResponse] = useState("");

  const handleSelectChange = (e) => {
    const selectedName = e.target.value;
    const req = apiRequests.find((r) => r.name === selectedName);
    setSelectedRequest(req);
    setResponse(""); // Clear previous response
  };

  const handleSubmit = async () => {
    if (!selectedRequest) {
      alert("Please select a request.");
      return;
    }

    try {
      const options = {
        method: selectedRequest.method,
        headers: selectedRequest.headers
      };

      if (selectedRequest.method === "POST" && selectedRequest.body) {
        options.body = JSON.stringify(selectedRequest.body);
      }

      const res = await fetch(selectedRequest.url, options);
      const contentType = res.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        data = await res.text();
        setResponse(data);
      }
    } catch (error) {
      setResponse("Error: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", fontFamily: "Arial" }}>
      <h2>REST API Tester</h2>

      <label htmlFor="api-select">Select Request:</label>
      <select id="api-select" onChange={handleSelectChange} defaultValue="">
        <option value="" disabled>
          -- Choose a request --
        </option>
        {apiRequests.map((req) => (
          <option key={req.name} value={req.name}>
            {req.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={handleSubmit}>Submit</button>

      <br />
      <br />

      <label>Response:</label>
      <textarea
        rows="20"
        cols="70"
        readOnly
        value={response}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}

export default App;
