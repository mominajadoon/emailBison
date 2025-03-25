const axios = require("axios");
const InboxTest = require("../Models/placementTest");

exports.createInboxTest = async (req, res) => {
  try {
    // API Request Headers
    const headers = {
      Authorization:
        "Bearer 52104|CsvBmu06PQr0dzokTu1QNN0FkJ3GeXrGGfdbWwiy5b370799",
      "Content-Type": "application/json",
    };

    // API Request Body
    const body = { name: req.body.name };

    // API Call
    const apiResponse = await axios.post(
      "https://app.emailguard.io/api/v1/inbox-placement-tests",
      body,
      { headers }
    );

    const inboxTestData = apiResponse.data.data;

    // Data ko MongoDB mein save karna
    const newInboxTest = new InboxTest({
      uuid: inboxTestData.uuid,
      name: inboxTestData.name,
      status: inboxTestData.status,
      google_workspace_emails_count:
        inboxTestData.google_workspace_emails_count,
      microsoft_professional_emails_count:
        inboxTestData.microsoft_professional_emails_count,
      created_at: inboxTestData.created_at,
    });

    await newInboxTest.save();

    res
      .status(201)
      .json({ message: "Inbox Test Created & Saved", data: newInboxTest });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error creating Inbox Test", error: error.message });
  }
};

exports.getInboxTest = async (req, res) => {
  try {
    const { id } = req.params;
    const apiUrl = `https://app.emailguard.io/api/v1/inbox-placement-tests/${id}`;
    const apiToken = "52104|CsvBmu06PQr0dzokTu1QNN0FkJ3GeXrGGfdbWwiy5b370799";

    console.log(`Fetching: ${apiUrl}`);
    console.log(`Token: ${apiToken}`);

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error fetching inbox test:",
      error.response ? error.response.data : error.message
    );
    res.status(error.response?.status || 500).json({
      message: "Failed to fetch inbox test",
      error: error.response?.data || error.message,
    });
  }
};

exports.getAllInboxTests = async (req, res) => {
    try {
      const apiUrl = `https://app.emailguard.io/api/v1/inbox-placement-tests`;
      const apiToken = "52104|CsvBmu06PQr0dzokTu1QNN0FkJ3GeXrGGfdbWwiy5b370799";
  
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      });
  
      console.log("API Response Data:", response.data);
  
      if (!response.data.data || response.data.data.length === 0) {
        return res
          .status(404)
          .json({ message: "No inbox placement tests found." });
      }
  
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error fetching inbox tests:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
  
      res.status(error.response?.status || 500).json({
        message: "Failed to fetch inbox tests",
        error: error.response?.data || error.message,
      });
    }
  };
  