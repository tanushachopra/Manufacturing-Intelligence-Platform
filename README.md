# FactoryOS — Industry 4.0 Manufacturing Intelligence Platform

**Predictive Maintenance | Digital Twin | Machine Learning | AI | IoT**

FactoryOS is an Industry 4.0 Manufacturing Intelligence Platform designed to monitor factory equipment, understand machine health, detect abnormal behaviour and support predictive maintenance decisions.

The platform uses CNC machines as a representative manufacturing use case and combines IoT-based machine telemetry, Machine Learning, Digital Twin visualization and Generative AI into a single system.

## 🚀 Live Demo

**Live Website:** [FactoryOS](https://manufacturing-intelligence-platform-five.vercel.app/)

**GitHub Repository:** [Manufacturing Intelligence Platform](https://github.com/tanushachopra/Manufacturing-Intelligence-Platform)

---

## 🎯 Problem Statement

In manufacturing environments, unexpected machine failures can lead to unplanned downtime, production losses, increased maintenance costs and reduced equipment availability.

Traditional reactive maintenance waits for a machine to fail before taking action.

FactoryOS aims to shift this approach toward predictive maintenance by continuously monitoring machine operating conditions and using machine learning to identify potential problems before complete failure.

---

## 💡 Solution

FactoryOS collects machine telemetry such as:

- Temperature
- Vibration
- Spindle speed
- Power consumption
- Motor current
- Tool wear
- Feed rate
- Coolant flow
- Cycle time
- Humidity
- Ambient temperature
- Air pressure

This data is processed through the backend and machine-learning services to generate:

- Machine health information
- Failure prediction
- Failure probability
- Remaining Useful Life (RUL)
- Anomaly detection
- Maintenance insights

The results are visualized through a Digital Twin interface and can also be queried using the AI Manufacturing Copilot.

---

## ✨ Key Features

### 🏭 Digital Twin

The Digital Twin provides a digital representation of the manufacturing floor and its machines.

Users can select individual machines and view:

- Current machine telemetry
- Machine health
- Temperature trends
- Failure risk
- Remaining Useful Life
- Tool wear
- Anomaly status
- Maintenance recommendations

The Digital Twin connects machine data with machine intelligence instead of functioning only as a visual representation.

### 📡 IoT-Based Machine Telemetry

The platform includes an IoT-based sensor layer for collecting and handling machine telemetry.

The telemetry layer provides parameters including:

- Temperature
- Vibration
- Motor current
- Power consumption
- Tool wear
- Spindle speed
- Coolant flow
- Cycle time

This allows the machine-learning layer and Digital Twin to operate using continuously updated machine conditions.

### 🤖 Predictive Maintenance

FactoryOS uses machine learning to support predictive maintenance.

Instead of waiting for a machine to fail, the system analyzes its operating condition and estimates the likelihood of failure.

```text
Machine Telemetry
       ↓
Machine Learning
       ↓
Failure Risk
       ↓
Maintenance Decision
