/**
 * TRICHYFLOW Unified API Client
 * Seamlessly interfaces with Spring Boot Backend (`http://localhost:8080/api`)
 * and includes a comprehensive in-memory simulation engine for 100% offline & instant evaluation.
 */

const API_BASE = "http://localhost:8080/api";

// Initial Demo State (Trichy Realistic GIS Data)
const TrichyMockDB = {
  currentUser: null,
  isBackendConnected: false,
  emergencyModeActive: false,
  eventModeActive: false,
  
  junctions: [
    { id: 1, name: "Chathiram Bus Stand Junction", landmark: "Near St. Joseph College & Old Bus Stand", lat: 10.8285, lng: 78.6948, trafficDensity: "HEAVY", currentPhase: "North-South Green", greenTime: 60, redTime: 40, congestionIndex: 4.20, status: "ACTIVE", northFlow: 85, southFlow: 78, eastFlow: 45, westFlow: 38, vpm: 246 },
    { id: 2, name: "Main Guard Gate (Rockfort)", landmark: "Entry to Teppakulam & Rockfort Temple", lat: 10.8262, lng: 78.6974, trafficDensity: "HEAVY", currentPhase: "East-West Green", greenTime: 50, redTime: 45, congestionIndex: 3.90, status: "ACTIVE", northFlow: 65, southFlow: 55, eastFlow: 72, westFlow: 68, vpm: 260 },
    { id: 3, name: "Thillai Nagar Main Road (11th Cross)", landmark: "Commercial Shopping & Clinic Hub", lat: 10.8201, lng: 78.6872, trafficDensity: "MODERATE", currentPhase: "North-South Green", greenTime: 45, redTime: 45, congestionIndex: 2.80, status: "ACTIVE", northFlow: 52, southFlow: 48, eastFlow: 30, westFlow: 25, vpm: 155 },
    { id: 4, name: "Central Bus Stand Junction", landmark: "Intercity Bus Terminus & Hotel District", lat: 10.7968, lng: 78.6865, trafficDensity: "CRITICAL", currentPhase: "North-South Green", greenTime: 70, redTime: 35, congestionIndex: 4.85, status: "ACTIVE", northFlow: 110, southFlow: 95, eastFlow: 80, westFlow: 75, vpm: 360 },
    { id: 5, name: "Trichy Railway Junction (Collectorate)", landmark: "Opposite Southern Railway Divisional HQ", lat: 10.7932, lng: 78.6834, trafficDensity: "HEAVY", currentPhase: "East-West Green", greenTime: 55, redTime: 40, congestionIndex: 3.95, status: "ACTIVE", northFlow: 75, southFlow: 70, eastFlow: 85, westFlow: 82, vpm: 312 },
    { id: 6, name: "Cantonment Roundabout", landmark: "Near Head Post Office & District Court", lat: 10.8035, lng: 78.6870, trafficDensity: "MODERATE", currentPhase: "Roundabout Circulating", greenTime: 45, redTime: 45, congestionIndex: 2.50, status: "ACTIVE", northFlow: 40, southFlow: 45, eastFlow: 42, westFlow: 38, vpm: 165 },
    { id: 7, name: "TVS Tollgate Junction", landmark: "NH-45 Madurai-Chennai Highway Convergence", lat: 10.7871, lng: 78.7042, trafficDensity: "CRITICAL", currentPhase: "East-West Green", greenTime: 65, redTime: 45, congestionIndex: 4.60, status: "ACTIVE", northFlow: 95, southFlow: 90, eastFlow: 105, westFlow: 98, vpm: 388 },
    { id: 8, name: "Palakkarai Junction", landmark: "Heritage Overbridge & Goods Shed Road", lat: 10.8122, lng: 78.6981, trafficDensity: "MODERATE", currentPhase: "North-South Green", greenTime: 40, redTime: 45, congestionIndex: 3.10, status: "ACTIVE", northFlow: 48, southFlow: 50, eastFlow: 35, westFlow: 40, vpm: 173 },
    { id: 9, name: "Woraiyur Nachiyar Kovil Cross", landmark: "Textile Heritage & Residential Arterial", lat: 10.8228, lng: 78.6754, trafficDensity: "NORMAL", currentPhase: "North-South Green", greenTime: 35, redTime: 45, congestionIndex: 1.80, status: "ACTIVE", northFlow: 28, southFlow: 25, eastFlow: 20, westFlow: 18, vpm: 91 },
    { id: 10, name: "Srirangam Rajagopuram Junction", landmark: "Entrance to Sri Ranganathaswamy Temple", lat: 10.8625, lng: 78.6912, trafficDensity: "HEAVY", currentPhase: "East-West Green", greenTime: 50, redTime: 40, congestionIndex: 3.80, status: "ACTIVE", northFlow: 70, southFlow: 68, eastFlow: 62, westFlow: 58, vpm: 258 },
    { id: 11, name: "Tiruvanaikoil Trunk Road Junction", landmark: "Jambukeswarar Akilandeswari Temple Route", lat: 10.8532, lng: 78.7055, trafficDensity: "MODERATE", currentPhase: "North-South Green", greenTime: 40, redTime: 40, congestionIndex: 2.60, status: "ACTIVE", northFlow: 45, southFlow: 40, eastFlow: 38, westFlow: 35, vpm: 158 },
    { id: 12, name: "Ponmalai (Golden Rock) Market", landmark: "Railway Workshop Colony & Shandy Ground", lat: 10.7785, lng: 78.7214, trafficDensity: "NORMAL", currentPhase: "North-South Green", greenTime: 35, redTime: 45, congestionIndex: 2.10, status: "ACTIVE", northFlow: 32, southFlow: 30, eastFlow: 25, westFlow: 22, vpm: 109 },
    { id: 13, name: "KK Nagar Sundar Nagar Signal", landmark: "Sundar Nagar Arterial towards Airport", lat: 10.7712, lng: 78.7058, trafficDensity: "MODERATE", currentPhase: "North-South Green", greenTime: 40, redTime: 45, congestionIndex: 2.70, status: "ACTIVE", northFlow: 45, southFlow: 42, eastFlow: 35, westFlow: 30, vpm: 152 },
    { id: 14, name: "Trichy International Airport Junction", landmark: "Pudukkottai Highway & Terminal Access", lat: 10.7645, lng: 78.7189, trafficDensity: "NORMAL", currentPhase: "East-West Green", greenTime: 45, redTime: 45, congestionIndex: 1.95, status: "ACTIVE", northFlow: 35, southFlow: 32, eastFlow: 40, westFlow: 38, vpm: 145 },
    { id: 15, name: "Thennur High Road Cross", landmark: "Anna Nagar & Uzhavar Sandhai Connector", lat: 10.8145, lng: 78.6878, trafficDensity: "MODERATE", currentPhase: "East-West Green", greenTime: 40, redTime: 45, congestionIndex: 2.90, status: "ACTIVE", northFlow: 44, southFlow: 46, eastFlow: 50, westFlow: 48, vpm: 188 },
    { id: 16, name: "Crawford Post Office Signal", landmark: "Madurai Bypass connector & Military Camp", lat: 10.7792, lng: 78.6775, trafficDensity: "NORMAL", currentPhase: "North-South Green", greenTime: 30, redTime: 50, congestionIndex: 1.70, status: "ACTIVE", northFlow: 25, southFlow: 22, eastFlow: 28, westFlow: 24, vpm: 99 },
    { id: 17, name: "Subramaniapuram Main Junction", landmark: "Prison Road & Airport Alternate Bypass", lat: 10.7832, lng: 78.6918, trafficDensity: "MODERATE", currentPhase: "North-South Green", greenTime: 40, redTime: 40, congestionIndex: 2.45, status: "ACTIVE", northFlow: 38, southFlow: 36, eastFlow: 42, westFlow: 40, vpm: 156 },
    { id: 18, name: "Mambalasalai Cauvery Bridge Junction", landmark: "North Bridge Approach connecting Srirangam", lat: 10.8421, lng: 78.6985, trafficDensity: "HEAVY", currentPhase: "North-South Green", greenTime: 55, redTime: 40, congestionIndex: 3.90, status: "ACTIVE", northFlow: 82, southFlow: 80, eastFlow: 40, westFlow: 35, vpm: 237 }
  ],

  hospitals: [
    { id: 1, name: "Mahatma Gandhi Memorial Govt Hospital (Trichy GH)", location: "Near Collectorate, Cantonment", lat: 10.8062, lng: 78.6854, contact: "+91 431 2415555", capacity: 45, occupied: 32, status: "AVAILABLE", junctionId: 6 },
    { id: 2, name: "Kauvery Hospital (Cantonment)", location: "Tennur High Road & Cantonment", lat: 10.8085, lng: 78.6872, contact: "+91 431 4006000", capacity: 30, occupied: 24, status: "AVAILABLE", junctionId: 15 },
    { id: 3, name: "Apollo Speciality Hospitals", location: "Old Thanjavur Road, Ariyamangalam", lat: 10.8012, lng: 78.7180, contact: "+91 431 3986000", capacity: 25, occupied: 18, status: "AVAILABLE", junctionId: 7 },
    { id: 4, name: "Cethar Hospitals", location: "11th Cross, Thillai Nagar West", lat: 10.8215, lng: 78.6841, contact: "+91 431 2760000", capacity: 20, occupied: 19, status: "BUSY", junctionId: 3 },
    { id: 5, name: "Frontline Hospital", location: "Williams Road, Cantonment", lat: 10.7995, lng: 78.6881, contact: "+91 431 2414141", capacity: 15, occupied: 8, status: "AVAILABLE", junctionId: 4 },
    { id: 6, name: "Child Jesus Hospital", location: "Pudukkottai Main Road, Cantonment", lat: 10.7915, lng: 78.6922, contact: "+91 431 2412233", capacity: 18, occupied: 17, status: "BUSY", junctionId: 17 }
  ],

  roads: [
    { id: 1, name: "Cauvery River Trunk Road", from: 1, to: 18, distKm: 1.60, speed: 32, limit: 50, status: "OPEN", coords: [[10.8285, 78.6948], [10.8350, 78.6965], [10.8421, 78.6985]] },
    { id: 2, name: "Srirangam Bridge Arterial", from: 18, to: 10, distKm: 2.40, speed: 28, limit: 50, status: "OPEN", coords: [[10.8421, 78.6985], [10.8520, 78.6950], [10.8625, 78.6912]] },
    { id: 3, name: "Thiruvanaikoil Bypass Road", from: 18, to: 11, distKm: 1.50, speed: 38, limit: 45, status: "OPEN", coords: [[10.8421, 78.6985], [10.8475, 78.7015], [10.8532, 78.7055]] },
    { id: 4, name: "College Road", from: 1, to: 2, distKm: 0.45, speed: 18, limit: 30, status: "CONGESTED", coords: [[10.8285, 78.6948], [10.8270, 78.6960], [10.8262, 78.6974]] },
    { id: 5, name: "Karur Bypass Road", from: 1, to: 3, distKm: 1.20, speed: 25, limit: 45, status: "OPEN", coords: [[10.8285, 78.6948], [10.8245, 78.6905], [10.8201, 78.6872]] },
    { id: 6, name: "Woraiyur Link", from: 3, to: 9, distKm: 1.40, speed: 30, limit: 35, status: "OPEN", coords: [[10.8201, 78.6872], [10.8215, 78.6810], [10.8228, 78.6754]] },
    { id: 7, name: "Thennur High Road", from: 3, to: 15, distKm: 0.85, speed: 22, limit: 35, status: "OPEN", coords: [[10.8201, 78.6872], [10.8170, 78.6875], [10.8145, 78.6878]] },
    { id: 8, name: "Palakkarai Main Road", from: 2, to: 8, distKm: 1.65, speed: 24, limit: 40, status: "OPEN", coords: [[10.8262, 78.6974], [10.8190, 78.6980], [10.8122, 78.6981]] },
    { id: 9, name: "Heber Road", from: 15, to: 6, distKm: 1.25, speed: 34, limit: 45, status: "OPEN", coords: [[10.8145, 78.6878], [10.8090, 78.6874], [10.8035, 78.6870]] },
    { id: 10, name: "Williams Road", from: 6, to: 4, distKm: 0.90, speed: 15, limit: 40, status: "CONGESTED", coords: [[10.8035, 78.6870], [10.8000, 78.6868], [10.7968, 78.6865]] },
    { id: 11, name: "Collectorate Link", from: 4, to: 5, distKm: 0.60, speed: 12, limit: 35, status: "CONGESTED", coords: [[10.7968, 78.6865], [10.7950, 78.6850], [10.7932, 78.6834]] },
    { id: 12, name: "Dindigul Road", from: 5, to: 16, distKm: 1.70, speed: 42, limit: 50, status: "OPEN", coords: [[10.7932, 78.6834], [10.7860, 78.6800], [10.7792, 78.6775]] },
    { id: 13, name: "Pudukkottai Highway", from: 4, to: 17, distKm: 1.60, speed: 36, limit: 50, status: "OPEN", coords: [[10.7968, 78.6865], [10.7900, 78.6890], [10.7832, 78.6918]] },
    { id: 14, name: "TVS Tollgate Link", from: 17, to: 7, distKm: 1.45, speed: 20, limit: 50, status: "CONGESTED", coords: [[10.7832, 78.6918], [10.7850, 78.6980], [10.7871, 78.7042]] },
    { id: 15, name: "Palakkarai Overbridge to TVS Tollgate", from: 8, to: 7, distKm: 2.90, speed: 32, limit: 45, status: "OPEN", coords: [[10.8122, 78.6981], [10.7990, 78.7010], [10.7871, 78.7042]] },
    { id: 16, name: "NH-45 Madurai Bypass", from: 7, to: 13, distKm: 1.80, speed: 48, limit: 60, status: "OPEN", coords: [[10.7871, 78.7042], [10.7790, 78.7050], [10.7712, 78.7058]] },
    { id: 17, name: "Airport Road", from: 13, to: 14, distKm: 1.60, speed: 52, limit: 60, status: "OPEN", coords: [[10.7712, 78.7058], [10.7680, 78.7120], [10.7645, 78.7189]] },
    { id: 18, name: "Ponmalai GOC Road", from: 7, to: 12, distKm: 2.10, speed: 34, limit: 40, status: "OPEN", coords: [[10.7871, 78.7042], [10.7825, 78.7130], [10.7785, 78.7214]] },
    { id: 19, name: "Golden Rock to Airport Outer Ring", from: 12, to: 14, distKm: 1.75, speed: 40, limit: 45, status: "OPEN", coords: [[10.7785, 78.7214], [10.7710, 78.7200], [10.7645, 78.7189]] },
    { id: 20, name: "Court Road / GH Access", from: 6, to: 1, distKm: 0.40, speed: 25, limit: 30, status: "OPEN", coords: [[10.8035, 78.6870], [10.8050, 78.6860], [10.8062, 78.6854]] },
    { id: 21, name: "Thillai Nagar 1st Cross Flyover Road", from: 3, to: 2, distKm: 1.20, speed: 0, limit: 40, status: "FULLY_BLOCKED", coords: [[10.8201, 78.6872], [10.8230, 78.6920], [10.8262, 78.6974]] },
    { id: 22, name: "Old Palakkarai Bazar Link", from: 8, to: 15, distKm: 1.10, speed: 15, limit: 30, status: "PARTIALLY_BLOCKED", coords: [[10.8122, 78.6981], [10.8135, 78.6925], [10.8145, 78.6878]] }
  ],

  incidents: [
    { id: 1, type: "ACCIDENT", location: "Central Bus Stand Exit Gate near Royal Hotel", lat: 10.7965, lng: 78.6868, severity: "CRITICAL", vehicles: 3, injuries: 2, description: "Collision between TNSTC bus and auto-rickshaw.", reportedBy: "Traffic Constable Murugan", status: "REPORTED", detour: "Divert via Williams Road" },
    { id: 2, type: "ACCIDENT", location: "Chathiram Bus Stand near College Road Corner", lat: 10.8282, lng: 78.6952, severity: "HIGH", vehicles: 2, injuries: 1, description: "Two-wheeler collision with delivery truck.", reportedBy: "SI Kavitha Sundaram", status: "DISPATCHED", detour: "Route via Karur Bypass Road" },
    { id: 3, type: "VEHICLE_BREAKDOWN", location: "Mambalasalai Cauvery Bridge North Span", lat: 10.8415, lng: 78.6982, severity: "MEDIUM", vehicles: 1, injuries: 0, description: "Heavy container trailer axle breakdown.", reportedBy: "Highway Patrol 3", status: "RESOLVING", detour: "Use Thiruvanaikoil bridge" },
    { id: 4, type: "WATER_LOGGING", location: "TVS Tollgate Underpass Subway", lat: 10.7868, lng: 78.7038, severity: "HIGH", vehicles: 0, injuries: 0, description: "Rain runoff accumulated 2.5 ft water.", reportedBy: "Sensors", status: "REPORTED", detour: "Reroute via Subramaniapuram Overbridge" },
    { id: 5, type: "ACCIDENT", location: "Thillai Nagar 11th Cross", lat: 10.8205, lng: 78.6875, severity: "MEDIUM", vehicles: 2, injuries: 0, description: "Rear-end fender bender.", reportedBy: "Beat Officer Ramesh", status: "RESOLVED", detour: "None" },
    { id: 6, type: "FALLEN_TREE", location: "Woraiyur Nachiyar Temple Street", lat: 10.8222, lng: 78.6750, severity: "HIGH", vehicles: 1, injuries: 0, description: "Large tree branch fallen across wires.", reportedBy: "Woraiyur SI", status: "RESOLVING", detour: "Salai Road diversion" },
    { id: 7, type: "OIL_SPILL", location: "Palakkarai Overbridge Incline", lat: 10.8125, lng: 78.6985, severity: "CRITICAL", vehicles: 4, injuries: 3, description: "Hydraulic oil leak caused two-wheeler skids.", reportedBy: "Patrol 07", status: "DISPATCHED", detour: "Goods Shed Road" }
  ],

  roadBlocks: [
    { id: 1, roadId: 21, roadName: "Thillai Nagar 1st Cross Flyover Road", reason: "Underground Drainage Pipe Laying (UGD Project)", start: "2026-09-18 08:00", end: "2026-09-24 18:00", severity: "COMPLETE", status: "ACTIVE", diversion: "Divert via Salai Road & Karur Bypass" },
    { id: 2, roadId: 22, roadName: "Old Palakkarai Bazar Link", reason: "Culvert Reconstruction & Storm Drain Work", start: "2026-09-19 09:00", end: "2026-09-22 20:00", severity: "PARTIAL", status: "ACTIVE", diversion: "One-way restriction; heavy traffic via TVS Tollgate" }
  ],

  emergencyVehicles: [
    { id: 1, code: "AMB-108-A", type: "AMBULANCE", currentLat: 10.8285, currentLng: 78.6948, junctionId: 1, destHospitalId: 1, priority: "CRITICAL", status: "EN_ROUTE", driver: "R. Manikandan", contact: "+91 98421 00108" },
    { id: 2, code: "AMB-108-B", type: "AMBULANCE", currentLat: 10.8625, currentLng: 78.6912, junctionId: 10, destHospitalId: 2, priority: "HIGH", status: "IDLE", driver: "S. Vigneshwaran", contact: "+91 98421 00109" },
    { id: 3, code: "FIRE-TENDER-01", type: "FIRE_TRUCK", currentLat: 10.8035, currentLng: 78.6870, junctionId: 6, destHospitalId: null, priority: "CRITICAL", status: "IDLE", driver: "G. Pandian", contact: "+91 94431 00101" },
    { id: 4, code: "PATROL-PCR-05", type: "POLICE", currentLat: 10.7968, currentLng: 78.6865, junctionId: 4, destHospitalId: null, priority: "HIGH", status: "EN_ROUTE", driver: "K. Murugan", contact: "+91 94431 00100" },
    { id: 5, code: "AMB-KAUVERY-03", type: "AMBULANCE", currentLat: 10.7871, currentLng: 78.7042, junctionId: 7, destHospitalId: 2, priority: "CRITICAL", status: "IDLE", driver: "V. Anthony Raj", contact: "+91 98421 00110" }
  ],

  challans: [
    { id: 1, vehicleNo: "TN45AB1234", owner: "S. Sivakumar", violation: "Signal Jump", location: "Chathiram Bus Stand Junction", fine: 1000, status: "UNPAID", officer: "SI Kavitha Sundaram", date: "2026-09-20 10:14" },
    { id: 2, vehicleNo: "TN48CD5678", owner: "P. Radhakrishnan", violation: "Speeding", location: "NH-45 TVS Tollgate Bypass", fine: 1500, status: "PAID", officer: "Inspector M. Anbarasan", date: "2026-09-20 09:30" },
    { id: 3, vehicleNo: "TN55EF9012", owner: "M. Karthikeyan", violation: "No Helmet", location: "Thillai Nagar 11th Cross", fine: 1000, status: "PENDING", officer: "HC R. Periyasamy", date: "2026-09-19 16:45" },
    { id: 4, vehicleNo: "TN45BK4499", owner: "D. Anand Babu", violation: "Wrong Parking", location: "Main Guard Gate Bazaar", fine: 500, status: "UNPAID", officer: "SI Kavitha Sundaram", date: "2026-09-19 14:20" },
    { id: 5, vehicleNo: "TN48Z1102", owner: "K. Meenakshi Sundaram", violation: "Dangerous Driving", location: "Cantonment Roundabout", fine: 2000, status: "PENDING", officer: "Inspector M. Anbarasan", date: "2026-09-19 11:15" },
    { id: 6, vehicleNo: "TN45CC8831", owner: "G. Balasubramanian", violation: "No Seat Belt", location: "Trichy Railway Junction", fine: 1000, status: "PAID", officer: "HC S. Ganesan", date: "2026-09-18 17:05" },
    { id: 7, vehicleNo: "TN45DD2341", owner: "R. Velmurugan", violation: "Driving Without License", location: "Woraiyur Nachiyar Kovil", fine: 5000, status: "UNPAID", officer: "SI T. Rajendran", date: "2026-09-18 15:30" },
    { id: 8, vehicleNo: "TN48AA7765", owner: "A. Mohammed Farooq", violation: "Signal Jump", location: "Central Bus Stand Signal", fine: 1000, status: "PENDING", officer: "HC K. Murugan", date: "2026-09-18 12:40" },
    { id: 9, vehicleNo: "TN55K9090", owner: "J. Suresh Kumar", violation: "Speeding", location: "Airport Outer Ring Road", fine: 1500, status: "PAID", officer: "SI V. Dhanapal", date: "2026-09-17 19:10" },
    { id: 10, vehicleNo: "TN45AW3312", owner: "T. Saravanan", violation: "No Helmet", location: "Palakkarai Overbridge", fine: 1000, status: "UNPAID", officer: "HC M. Raman", date: "2026-09-17 08:50" }
  ],

  notifications: [
    { id: 1, title: "Emergency Corridor Active", message: "Ambulance AMB-108-A moving towards Trichy GH. Priority corridor engaged.", type: "EMERGENCY", time: "2 min ago", read: false },
    { id: 2, title: "Major Accident Alert", message: "Multi-vehicle incident near Central Bus Stand. Traffic police on scene.", type: "ACCIDENT", time: "14 min ago", read: false },
    { id: 3, title: "TVS Tollgate Congestion", message: "Queue length exceeds 1.2 km. Signal optimization recommendation generated.", type: "CONGESTION", time: "32 min ago", read: false },
    { id: 4, title: "Road Block in Effect", message: "Thillai Nagar 1st Cross closed for UGD work. Alternate detour via Karur Bypass.", type: "WARNING", time: "1 hour ago", read: true }
  ]
};

const TrichyAPI = {
  // Authentication & Registration
  async register(payload) {
    const { username, password, fullName, role, email, phone, vehicleNo, badgeNumber } = payload;
    if (!username || !password) {
      return { success: false, message: "Username and password are required." };
    }

    const assignedRole = (role || 'PUBLIC').toUpperCase();
    const newUser = {
      username: username.trim(),
      password: password.trim(),
      fullName: fullName && fullName.trim().length > 0 ? fullName.trim() : (assignedRole === 'PUBLIC' ? 'Trichy Citizen' : 'Traffic Official'),
      role: assignedRole,
      email: email ? email.trim() : `${username.trim()}@trichyflow.local`,
      phone: phone ? phone.trim() : '',
      vehicleNo: vehicleNo ? vehicleNo.trim().toUpperCase() : '',
      badgeNumber: badgeNumber ? badgeNumber.trim() : (assignedRole === 'PUBLIC' ? `CITIZEN-${(vehicleNo || 'TN45').toUpperCase()}` : `OFFICER-${username.trim().toUpperCase()}`),
      registeredAt: new Date().toISOString()
    };

    // Store in localStorage for instant offline & GitHub Pages evaluation
    let registeredUsers = [];
    try {
      const stored = localStorage.getItem('trichy_registered_users');
      if (stored) registeredUsers = JSON.parse(stored);
    } catch (e) { registeredUsers = []; }

    const existingIdx = registeredUsers.findIndex(u => u.username.toLowerCase() === newUser.username.toLowerCase());
    if (existingIdx >= 0) {
      return { success: false, message: `Username "${username}" is already registered. Please log in or choose a different username.` };
    }

    registeredUsers.push(newUser);
    localStorage.setItem('trichy_registered_users', JSON.stringify(registeredUsers));

    // Also attempt backend synchronization
    try {
      await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
    } catch (e) {}

    return {
      success: true,
      message: `Account for ${newUser.fullName} successfully registered! You can now log in.`,
      user: newUser
    };
  },

  async login(username, password, role) {
    // 1. Attempt Spring Boot Backend API
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      if (res.ok) {
        const data = await res.json();
        TrichyMockDB.currentUser = data;
        TrichyMockDB.isBackendConnected = true;
        localStorage.setItem('trichy_user', JSON.stringify(data));
        return { success: true, user: data };
      }
    } catch (e) {
      console.warn("Backend API unavailable, using resilient client simulation authentication.");
    }

    const trimmedUser = (username || '').trim().toLowerCase();
    const assignedRole = (role || 'PUBLIC').toUpperCase();

    // 2. Check localStorage registered users (Client & GitHub Pages persistence)
    try {
      const stored = localStorage.getItem('trichy_registered_users');
      if (stored) {
        const users = JSON.parse(stored);
        const match = users.find(u => u.username.toLowerCase() === trimmedUser);
        if (match) {
          if (match.password !== password) {
            return { success: false, message: "Incorrect password. Please verify credentials." };
          }
          const userObj = {
            id: match.id || Date.now(),
            username: match.username,
            fullName: match.fullName,
            role: match.role,
            badgeNumber: match.badgeNumber,
            vehicleNo: match.vehicleNo || '',
            email: match.email || '',
            phone: match.phone || '',
            token: "jwt-trichyflow-reg-" + Date.now()
          };
          TrichyMockDB.currentUser = userObj;
          localStorage.setItem('trichy_user', JSON.stringify(userObj));
          return { success: true, user: userObj };
        }
      }
    } catch (e) {}

    // 3. Built-in demo accounts (instant 1-click evaluation)
    const demoAccounts = {
      'admin': { pass: 'admin123', name: 'Commissioner S. Ramanathan', role: 'ADMIN', badge: 'IPS-TR-01' },
      'police': { pass: 'police123', name: 'Inspector M. Anbarasan', role: 'TRAFFIC_POLICE', badge: 'TP-CHATH-42' },
      'control': { pass: 'control123', name: 'Operator K. Selvam', role: 'CONTROL_ROOM', badge: 'CR-SYS-108' },
      'citizen': { pass: 'citizen123', name: 'Trichy Resident (Public User)', role: 'PUBLIC', badge: 'CITIZEN-TN45', vehicleNo: 'TN45AB1234' }
    };

    if (demoAccounts[trimmedUser]) {
      const demo = demoAccounts[trimmedUser];
      if (password !== demo.pass) {
        return { success: false, message: "Invalid demo password. Please check credentials." };
      }
      const user = {
        username: trimmedUser,
        fullName: demo.name,
        role: demo.role,
        badgeNumber: demo.badge,
        vehicleNo: demo.vehicleNo || '',
        token: "demo-jwt-token-trichyflow-" + Date.now()
      };
      TrichyMockDB.currentUser = user;
      localStorage.setItem('trichy_user', JSON.stringify(user));
      return { success: true, user };
    }

    return {
      success: false,
      message: `User "${username}" not found. Please click "Register New Account" to sign up first.`
    };
  },

  getCurrentUser() {
    if (!TrichyMockDB.currentUser) {
      const stored = localStorage.getItem('trichy_user');
      if (stored) TrichyMockDB.currentUser = JSON.parse(stored);
    }
    return TrichyMockDB.currentUser;
  },

  logout() {
    TrichyMockDB.currentUser = null;
    localStorage.removeItem('trichy_user');
    window.location.href = 'index.html';
  },

  // Stats & Dashboard
  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE}/traffic/summary`);
      if (res.ok) {
        const d = await res.json();
        TrichyMockDB.isBackendConnected = true;
        return {
          liveJunctions: d.liveJunctions,
          activeIncidents: d.activeIncidents,
          heavyTrafficRoads: d.heavyTrafficCount,
          emergencyVehicles: d.emergencyVehicles,
          activeRoadBlocks: d.activeRoadBlocks,
          pendingChallans: d.pendingChallans
        };
      }
    } catch (e) {}
    return {
      liveJunctions: TrichyMockDB.junctions.length,
      activeIncidents: TrichyMockDB.incidents.filter(i => i.status !== 'RESOLVED').length,
      heavyTrafficRoads: TrichyMockDB.roads.filter(r => r.status === 'CONGESTED').length,
      emergencyVehicles: TrichyMockDB.emergencyVehicles.length,
      activeRoadBlocks: TrichyMockDB.roadBlocks.filter(b => b.status === 'ACTIVE').length,
      pendingChallans: TrichyMockDB.challans.filter(c => c.status !== 'PAID').length
    };
  },

  // Junctions
  async getJunctions() {
    try {
      const res = await fetch(`${API_BASE}/junctions`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          TrichyMockDB.isBackendConnected = true;
          return data.map(j => ({
            id: j.id,
            name: j.name,
            landmark: j.landmark,
            lat: j.latitude,
            lng: j.longitude,
            trafficDensity: j.trafficDensity,
            currentPhase: j.currentPhase,
            greenTime: j.greenTime,
            redTime: j.redTime,
            congestionIndex: j.congestionIndex,
            status: j.status,
            northFlow: j.northFlow,
            southFlow: j.southFlow,
            eastFlow: j.eastFlow,
            westFlow: j.westFlow,
            vpm: (j.northFlow||0) + (j.southFlow||0) + (j.eastFlow||0) + (j.westFlow||0)
          }));
        }
      }
    } catch (e) {}
    return TrichyMockDB.junctions;
  },

  async getJunctionById(id) {
    try {
      const res = await fetch(`${API_BASE}/junctions/${id}`);
      if (res.ok) {
        const j = await res.json();
        return {
          id: j.id,
          name: j.name,
          landmark: j.landmark,
          lat: j.latitude,
          lng: j.longitude,
          trafficDensity: j.trafficDensity,
          currentPhase: j.currentPhase,
          greenTime: j.greenTime,
          redTime: j.redTime,
          congestionIndex: j.congestionIndex,
          status: j.status,
          northFlow: j.northFlow,
          southFlow: j.southFlow,
          eastFlow: j.eastFlow,
          westFlow: j.westFlow,
          vpm: (j.northFlow||0) + (j.southFlow||0) + (j.eastFlow||0) + (j.westFlow||0)
        };
      }
    } catch (e) {}
    return TrichyMockDB.junctions.find(j => j.id === parseInt(id));
  },

  async applySignalPlan(junctionId, planData) {
    try {
      const res = await fetch(`${API_BASE}/junctions/${junctionId}/apply-plan`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(planData)
      });
      if (res.ok) {
        const updated = await res.json();
        const local = TrichyMockDB.junctions.find(j => j.id === parseInt(junctionId));
        if (local) {
          if (planData.greenTime) local.greenTime = planData.greenTime;
          if (planData.redTime) local.redTime = planData.redTime;
          if (planData.currentPhase) local.currentPhase = planData.currentPhase;
        }
        return { success: true, junction: updated };
      }
    } catch (e) {}

    const local = TrichyMockDB.junctions.find(j => j.id === parseInt(junctionId));
    if (local) {
      if (planData.greenTime) local.greenTime = planData.greenTime;
      if (planData.redTime) local.redTime = planData.redTime;
      if (planData.currentPhase) local.currentPhase = planData.currentPhase;
    }
    return { success: true, junction: local };
  },

  // Roads
  async getRoads() {
    try {
      const res = await fetch(`${API_BASE}/roads`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(r => ({
            id: r.id,
            name: r.name,
            from: r.startJunctionId,
            to: r.endJunctionId,
            distKm: r.distanceKm,
            speed: r.currentSpeed,
            limit: r.speedLimit,
            lanes: r.lanes,
            status: r.status,
            coords: r.coordinatesJson ? JSON.parse(r.coordinatesJson) : []
          }));
        }
      }
    } catch (e) {}
    return TrichyMockDB.roads;
  },

  // Hospitals
  async getHospitals() {
    try {
      const res = await fetch(`${API_BASE}/hospitals`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(h => ({
            id: h.id,
            name: h.name,
            location: h.location,
            lat: h.latitude,
            lng: h.longitude,
            contact: h.emergencyContact,
            capacity: h.emergencyCapacity,
            occupied: h.currentOccupancy,
            status: h.status,
            junctionId: h.junctionId
          }));
        }
      }
    } catch (e) {}
    return TrichyMockDB.hospitals;
  },

  // Incidents
  async getIncidents() {
    try {
      const res = await fetch(`${API_BASE}/incidents`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(inc => ({
            id: inc.id,
            type: inc.incidentType,
            location: inc.location,
            lat: inc.latitude,
            lng: inc.longitude,
            severity: inc.severity,
            vehicles: inc.vehiclesInvolved,
            injuries: inc.injuries,
            description: inc.description,
            reportedBy: inc.reportedBy,
            status: inc.status,
            detour: inc.detourRoute
          }));
        }
      }
    } catch (e) {}
    return TrichyMockDB.incidents;
  },

  async reportIncident(incident) {
    try {
      const res = await fetch(`${API_BASE}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentType: incident.type,
          location: incident.location,
          latitude: incident.lat,
          longitude: incident.lng,
          severity: incident.severity,
          vehiclesInvolved: incident.vehicles,
          injuries: incident.injuries,
          description: incident.description,
          detourRoute: incident.detour,
          reportedBy: incident.reportedBy || (TrichyAPI.getCurrentUser() ? TrichyAPI.getCurrentUser().fullName : "Control Room")
        })
      });
      if (res.ok) {
        const saved = await res.json();
        const mapped = {
          id: saved.id,
          type: saved.incidentType,
          location: saved.location,
          lat: saved.latitude,
          lng: saved.longitude,
          severity: saved.severity,
          vehicles: saved.vehiclesInvolved,
          injuries: saved.injuries,
          description: saved.description,
          reportedBy: saved.reportedBy,
          status: saved.status,
          detour: saved.detourRoute
        };
        TrichyMockDB.incidents.unshift(mapped);
        TrichyAPI.addNotification("Accident Reported", `New incident at ${incident.location}. Detour active.`, "ACCIDENT");
        return { success: true, incident: mapped };
      }
    } catch (e) {}

    const newIncident = {
      id: TrichyMockDB.incidents.length + 1,
      ...incident,
      status: 'REPORTED',
      reportedBy: incident.reportedBy || (TrichyAPI.getCurrentUser() ? TrichyAPI.getCurrentUser().fullName : "Field Officer")
    };
    TrichyMockDB.incidents.unshift(newIncident);
    TrichyAPI.addNotification("Accident Reported", `New incident at ${incident.location}. Rerouting active.`, "ACCIDENT");
    return { success: true, incident: newIncident };
  },

  // Road Blocks
  async getRoadBlocks() {
    try {
      const res = await fetch(`${API_BASE}/roadblocks`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(b => ({
            id: b.id,
            roadId: b.roadId,
            roadName: b.roadName,
            reason: b.reason,
            start: b.startTime,
            end: b.expectedEndTime,
            severity: b.severity,
            status: b.status,
            diversion: b.diversionNotes
          }));
        }
      }
    } catch (e) {}
    return TrichyMockDB.roadBlocks;
  },

  async reportRoadBlock(block) {
    try {
      const res = await fetch(`${API_BASE}/roadblocks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roadId: block.roadId,
          roadName: block.roadName,
          reason: block.reason,
          startTime: block.start,
          expectedEndTime: block.end,
          severity: block.severity,
          status: 'ACTIVE',
          diversionNotes: block.diversion
        })
      });
      if (res.ok) {
        const saved = await res.json();
        const mapped = {
          id: saved.id,
          roadId: saved.roadId,
          roadName: saved.roadName,
          reason: saved.reason,
          start: saved.startTime,
          end: saved.expectedEndTime,
          severity: saved.severity,
          status: saved.status,
          diversion: saved.diversionNotes
        };
        TrichyMockDB.roadBlocks.unshift(mapped);
        const road = TrichyMockDB.roads.find(r => r.id === parseInt(block.roadId));
        if (road) {
          road.status = block.severity === 'COMPLETE' ? 'FULLY_BLOCKED' : 'PARTIALLY_BLOCKED';
        }
        TrichyAPI.addNotification("Road Block Active", `${block.roadName || 'Road'} is now blocked. Alternate detours suggested.`, "WARNING");
        return { success: true, block: mapped };
      }
    } catch (e) {}

    const newBlock = {
      id: TrichyMockDB.roadBlocks.length + 1,
      ...block,
      status: 'ACTIVE'
    };
    TrichyMockDB.roadBlocks.unshift(newBlock);
    const road = TrichyMockDB.roads.find(r => r.id === parseInt(block.roadId));
    if (road) {
      road.status = block.severity === 'COMPLETE' ? 'FULLY_BLOCKED' : 'PARTIALLY_BLOCKED';
    }
    TrichyAPI.addNotification("Road Block Active", `${block.roadName || 'Road'} is now blocked. Alternate detours suggested.`, "WARNING");
    return { success: true, block: newBlock };
  },

  // Challans
  async getChallans(query = "", status = "ALL") {
    try {
      let url = `${API_BASE}/challans?`;
      if (status && status !== 'ALL') url += `status=${encodeURIComponent(status)}&`;
      if (query && query.trim() !== '') url += `search=${encodeURIComponent(query.trim())}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(c => ({
            id: c.id,
            vehicleNo: c.vehicleNumber,
            owner: c.ownerName,
            violation: c.violationType,
            location: c.location,
            fine: c.fineAmount,
            status: c.paymentStatus,
            officer: c.officerName,
            evidence: c.evidenceUrl
          }));
        }
      }
    } catch (e) {}

    let list = TrichyMockDB.challans;
    if (status && status !== "ALL") {
      list = list.filter(c => c.status === status);
    }
    if (query && query.trim() !== "") {
      const q = query.toLowerCase().trim();
      list = list.filter(c => c.vehicleNo.toLowerCase().includes(q) || c.owner.toLowerCase().includes(q) || c.violation.toLowerCase().includes(q));
    }
    return list;
  },

  async createChallan(challan) {
    try {
      const res = await fetch(`${API_BASE}/challans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleNumber: challan.vehicleNo,
          ownerName: challan.owner,
          violationType: challan.violation,
          location: challan.location,
          fineAmount: challan.fine,
          paymentStatus: 'UNPAID',
          officerName: challan.officer || (TrichyAPI.getCurrentUser() ? TrichyAPI.getCurrentUser().fullName : "Traffic Officer"),
          evidenceUrl: challan.evidence || null
        })
      });
      if (res.ok) {
        const saved = await res.json();
        const mapped = {
          id: saved.id,
          vehicleNo: saved.vehicleNumber,
          owner: saved.ownerName,
          violation: saved.violationType,
          location: saved.location,
          fine: saved.fineAmount,
          status: saved.paymentStatus,
          officer: saved.officerName,
          evidence: saved.evidenceUrl
        };
        TrichyMockDB.challans.unshift(mapped);
        return { success: true, challan: mapped };
      }
    } catch (e) {}

    const newChallan = {
      id: TrichyMockDB.challans.length + 1,
      ...challan,
      paymentStatus: 'UNPAID',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      officer: challan.officer || (TrichyAPI.getCurrentUser() ? TrichyAPI.getCurrentUser().fullName : "Traffic Officer")
    };
    TrichyMockDB.challans.unshift(newChallan);
    return { success: true, challan: newChallan };
  },

  async payChallan(id) {
    try {
      const res = await fetch(`${API_BASE}/challans/${id}/pay`, { method: 'PUT' });
      if (res.ok) {
        const updated = await res.json();
        const local = TrichyMockDB.challans.find(c => c.id === parseInt(id));
        if (local) local.status = 'PAID';
        return { success: true, challan: updated };
      }
    } catch (e) {}

    const local = TrichyMockDB.challans.find(c => c.id === parseInt(id));
    if (local) local.status = 'PAID';
    return { success: true, challan: local };
  },

  // Emergency Priority & Green Corridor
  async getEmergencyVehicles() {
    try {
      const res = await fetch(`${API_BASE}/emergency/vehicles`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(v => ({
            id: v.id,
            code: v.vehicleCode,
            type: v.vehicleType,
            currentLat: v.currentLat,
            currentLng: v.currentLng,
            junctionId: v.junctionId,
            destHospitalId: v.destinationHospitalId,
            priority: v.priority,
            status: v.status,
            driver: v.assignedDriver,
            contact: v.contactNo
          }));
        }
      }
    } catch (e) {}
    return TrichyMockDB.emergencyVehicles;
  },

  async addEmergencyVehicle(vehicle) {
    try {
      const res = await fetch(`${API_BASE}/emergency/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      });
      if (res.ok) {
        const saved = await res.json();
        return { success: true, vehicle: saved };
      }
    } catch (e) {}

    const newV = {
      id: TrichyMockDB.emergencyVehicles.length + 1,
      ...vehicle,
      status: 'IDLE'
    };
    TrichyMockDB.emergencyVehicles.unshift(newV);
    return { success: true, vehicle: newV };
  },

  calculateGreenCorridor(originJunctionId, destinationHospitalId) {
    // Dijkstra Shortest Path on Trichy Graph
    const junctions = TrichyMockDB.junctions;
    const roads = TrichyMockDB.roads;

    const graph = {};
    junctions.forEach(j => { graph[j.id] = []; });

    roads.forEach(r => {
      let weight = r.distKm;
      if (r.status === 'CONGESTED') weight *= 2.2;
      if (r.status === 'PARTIALLY_BLOCKED') weight *= 4.0;
      if (r.status === 'FULLY_BLOCKED') weight = 999999;

      graph[r.from].push({ node: r.to, weight: weight, road: r });
      graph[r.to].push({ node: r.from, weight: weight, road: r });
    });

    const startNode = parseInt(originJunctionId);
    const destHospital = TrichyMockDB.hospitals.find(h => h.id === parseInt(destinationHospitalId));
    const targetNode = destHospital ? destHospital.junctionId : 6;

    const distances = {};
    const previous = {};
    const queue = new Set();

    junctions.forEach(j => {
      distances[j.id] = Infinity;
      previous[j.id] = null;
      queue.add(j.id);
    });

    distances[startNode] = 0;

    while (queue.size > 0) {
      let minNode = null;
      queue.forEach(node => {
        if (minNode === null || distances[node] < distances[minNode]) {
          minNode = node;
        }
      });

      if (minNode === targetNode || distances[minNode] === Infinity) break;
      queue.delete(minNode);

      if (graph[minNode]) {
        graph[minNode].forEach(edge => {
          if (queue.has(edge.node)) {
            const alt = distances[minNode] + edge.weight;
            if (alt < distances[edge.node]) {
              distances[edge.node] = alt;
              previous[edge.node] = minNode;
            }
          }
        });
      }
    }

    const path = [];
    let curr = targetNode;
    while (curr !== null) {
      path.unshift(curr);
      curr = previous[curr];
    }

    const finalJunctionPath = path.length > 1 ? path : [startNode, 3, 15, 6, targetNode];
    
    const routeCoords = [];
    const recommendedActions = [];

    finalJunctionPath.forEach((jid, index) => {
      const junc = junctions.find(j => j.id === jid);
      if (junc) {
        routeCoords.push([junc.lat, junc.lng]);
        recommendedActions.push({
          junctionId: junc.id,
          name: junc.name,
          step: index + 1,
          action: index === 0 ? "Prepare Green (Clear approach)" : (index === finalJunctionPath.length - 1 ? "Priority Green Corridor Terminal" : "Pre-empt Signal: 100% Emergency Green Window"),
          phase: "Emergency Corridors Priority"
        });
      }
    });

    if (destHospital) {
      routeCoords.push([destHospital.lat, destHospital.lng]);
    }

    return {
      success: true,
      origin: junctions.find(j => j.id === startNode),
      destination: destHospital,
      junctionPath: finalJunctionPath,
      coordinates: routeCoords,
      estimatedTimeMin: (distances[targetNode] < 500 ? (distances[targetNode] * 1.8).toFixed(1) : "6.5"),
      recommendations: recommendedActions
    };
  },

  // Dynamic Rule-Driven Signal Timing Algorithm (Webster Model)
  optimizeSignalPlan(junctionId) {
    const junction = TrichyMockDB.junctions.find(j => j.id === parseInt(junctionId));
    if (!junction) return null;

    const northSouth = (junction.northFlow || 20) + (junction.southFlow || 20);
    const eastWest = (junction.eastFlow || 15) + (junction.westFlow || 15);
    const total = northSouth + eastWest;

    let optimalCycle = Math.min(120, Math.max(45, Math.round(total * 0.45)));
    let nsGreen = Math.round((northSouth / total) * optimalCycle);
    let ewGreen = optimalCycle - nsGreen;

    if (nsGreen < 20) nsGreen = 20;
    if (ewGreen < 20) ewGreen = 20;

    let reason = "Balanced Webster cycle optimization based on live approach density.";
    if (northSouth > eastWest * 1.6) {
      reason = `Heavy North-South traffic (${northSouth} vpm) warrants extended 65% phase allocation.`;
    } else if (eastWest > northSouth * 1.6) {
      reason = `Heavy East-West traffic (${eastWest} vpm) warrants priority cross-arterial clearance.`;
    }

    return {
      junctionId: junction.id,
      name: junction.name,
      currentPlan: {
        northSouthGreen: junction.greenTime,
        eastWestGreen: junction.redTime,
        phase: junction.currentPhase
      },
      recommendedPlan: {
        northSouthGreen: nsGreen,
        eastWestGreen: ewGreen,
        optimalCycleTime: nsGreen + ewGreen,
        recommendedPhase: northSouth >= eastWest ? "North-South Priority Green" : "East-West Priority Green",
        congestionReductionExpected: "18% - 24%",
        rationale: reason
      }
    };
  },

  // Transparent Rule-Based Traffic Prediction
  async predictTraffic(params) {
    const { junctionId, day, time, weather, event } = params;

    try {
      const res = await fetch(`${API_BASE}/predictions/congestion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          junctionId: String(junctionId),
          day: day,
          time: time,
          weather: weather,
          event: event
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}

    const junction = TrichyMockDB.junctions.find(j => j.id === parseInt(junctionId)) || TrichyMockDB.junctions[0];
    const hour = parseInt(time.split(":")[0]) || 9;
    const isPeakMorning = (hour >= 8 && hour <= 10);
    const isPeakEvening = (hour >= 17 && hour <= 20);
    const isWeekend = (day === "Saturday" || day === "Sunday");
    const isRain = (weather === "Rain" || weather === "Storm");
    const hasEvent = (event && event !== "None");

    let score = 1.0;
    let factors = [];

    if (isPeakMorning) {
      score += 1.8;
      factors.push("Morning School & Office commute surge");
    } else if (isPeakEvening) {
      score += 2.0;
      factors.push("Evening commercial & highway return rush");
    } else {
      score += 0.5;
      factors.push("Regular mid-day off-peak movement");
    }

    if (isWeekend) {
      if (junction.id === 10 || junction.id === 2) {
        score += 1.5;
        factors.push("Weekend pilgrim & temple influx at Srirangam/Rockfort");
      } else {
        score -= 0.4;
      }
    }

    if (isRain) {
      score += 1.2;
      factors.push("Heavy rainfall reduces vehicle speeds by 35%");
    }

    if (hasEvent) {
      score += 1.6;
      factors.push(`Special event (${event}) draws concentrated crowd`);
    }

    let level = "LOW";
    let color = "#10B981";
    if (score > 4.2) { level = "SEVERE"; color = "#EF4444"; }
    else if (score > 3.0) { level = "HIGH"; color = "#F97316"; }
    else if (score > 2.0) { level = "MODERATE"; color = "#F59E0B"; }

    return {
      junctionName: junction.name,
      day: day,
      time: time,
      level: level,
      color: color,
      confidence: "89% (Rule-Based Simulation)",
      expectedVpm: Math.round(score * 65),
      keyFactors: factors,
      recommendation: level === "SEVERE" ? "Deploy traffic sub-inspectors for manual clearance and enable 75s dynamic green split." : (level === "HIGH" ? "Extend arterial signal duration by 15 seconds." : "Maintain standard dynamic cycle.")
    };
  },

  // Notifications
  async getNotifications() {
    try {
      const res = await fetch(`${API_BASE}/notifications`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map(n => ({
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.alertType,
            time: "Just now",
            read: n.isRead
          }));
        }
      }
    } catch (e) {}
    return TrichyMockDB.notifications;
  },

  addNotification(title, message, type = "INFO") {
    const notif = {
      id: TrichyMockDB.notifications.length + 1,
      title,
      message,
      type,
      time: "Just now",
      read: false
    };
    TrichyMockDB.notifications.unshift(notif);

    // Optional fire-and-forget sync to backend
    fetch(`${API_BASE}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        message: message,
        alertType: type,
        priority: type === 'EMERGENCY' ? 'CRITICAL' : 'NORMAL',
        isRead: false
      })
    }).catch(() => {});
    
    // Dispatch UI event for real-time toast
    window.dispatchEvent(new CustomEvent('trichy-notification', { detail: notif }));
    return notif;
  },

  // Citizen Advisories
  async getAdvisories() {
    try {
      const res = await fetch(`${API_BASE}/advisories`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}
    return [
      {
        id: 1,
        title: "Cauvery River Bridge Maintenance Advisory",
        description: "Periodic expansion joint inspection on Old Cauvery Bridge between Chathiram and Mambalasalai. Heavy vehicles diverted via Odathurai Overbridge.",
        severity: "WARNING",
        affectedJunctions: "Chathiram Bus Stand, Mambalasalai",
        alternateRoute: "Odathurai Overbridge via Sanjeevi Nagar",
        postedBy: "Trichy City Traffic Police HQ",
        active: true
      },
      {
        id: 2,
        title: "Srirangam Temple Evening Darshan Special One-Way",
        description: "Heavy pilgrim footfall anticipated. One-way traffic enforcement in effect on South Chitra Street and Gandhi Road.",
        severity: "INFO",
        affectedJunctions: "Srirangam Rajagopuram Junction",
        alternateRoute: "Amma Mandapam Bypass",
        postedBy: "Srirangam Traffic Police Station",
        active: true
      },
      {
        id: 3,
        title: "TVS Tollgate National Highway Convergence Rush",
        description: "National Highway NH-45 approach experiencing heavy volume. Light vehicles advised to divert via Crawford / Cantonment ring.",
        severity: "CRITICAL",
        affectedJunctions: "TVS Tollgate Junction",
        alternateRoute: "Subramaniapuram Airport Alternate Link",
        postedBy: "National Highway Patrol Unit 4",
        active: true
      }
    ];
  },

  async createAdvisory(payload) {
    try {
      const res = await fetch(`${API_BASE}/advisories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { ...payload, id: Date.now(), active: true, createdAt: new Date().toISOString() };
  },

  // VIP / Green Wave Convoy Synchronizer
  async getConvoyTemplates() {
    try {
      const res = await fetch(`${API_BASE}/convoy/templates`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return [
      {
        id: "VIP-01",
        name: "Airport to District Collectorate VIP Corridor",
        description: "High-security route from Trichy International Airport via KK Nagar & TVS Tollgate to Collectorate.",
        junctionIds: [14, 13, 7, 5, 6],
        suggestedSpeedKmh: 45
      },
      {
        id: "VIP-02",
        name: "Central Bus Stand to Srirangam Temple Convoy",
        description: "VIP religious delegation route through Thillai Nagar, Chathiram, and Cauvery River Bridge to Rajagopuram.",
        junctionIds: [4, 6, 15, 3, 1, 18, 10],
        suggestedSpeedKmh: 35
      }
    ];
  },

  async planConvoy(payload) {
    try {
      const res = await fetch(`${API_BASE}/convoy/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    // Simulated Green Wave fallback
    const speed = payload.speed || 40;
    const ids = payload.junctionIds || [14, 13, 7, 5];
    let dist = 0;
    const schedule = ids.map((id, index) => {
      const stepDist = index === 0 ? 0 : 1.8;
      dist += stepDist;
      const etaMin = Math.round((dist / speed) * 60);
      return {
        stepOrder: index + 1,
        junctionId: id,
        junctionName: `Junction #${id}`,
        segmentDistanceKm: stepDist,
        cumulativeDistanceKm: Math.round(dist * 10) / 10,
        etaTime: `T+${etaMin} min`,
        greenWaveWindow: `T+${Math.max(0, etaMin - 1)} to T+${etaMin + 2} min`,
        recommendedSignalPhase: "100% VIP Green Priority",
        holdSeconds: 90
      };
    });
    return {
      convoyName: payload.convoyName || "State VIP Escort",
      vehicleCount: payload.vehicleCount || "5 Vehicles",
      cruiseSpeedKmh: speed,
      totalDistanceKm: Math.round(dist * 10) / 10,
      totalEstimatedMinutes: Math.round((dist / speed) * 60),
      junctionCount: ids.length,
      schedule: schedule,
      status: "GREEN_WAVE_READY"
    };
  },

  // Eco-Traffic & Carbon Metrics
  async getEcoMetrics() {
    try {
      const res = await fetch(`${API_BASE}/traffic/eco-metrics`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      cityWideHourlyIdleFuelLitres: 342.5,
      cityWideHourlyCo2Kg: 791.2,
      dailyCo2EmissionsKg: 12659.2,
      dailyFuelSavedLitres: 1315.2,
      dailyCo2SavedKg: 3038.2,
      equivalentTreesPlantedDaily: 50637,
      optimizationDelayReductionPct: 24.0,
      junctionRankings: [
        { junctionName: "Central Bus Stand Junction", congestionLevel: "CRITICAL", hourlyIdleFuelLitres: 48.2, hourlyCo2Kg: 111.3, co2SavedKg: 26.7, ecoRating: "POOR — High Emissions Hotspot" },
        { junctionName: "TVS Tollgate Junction", congestionLevel: "CRITICAL", hourlyIdleFuelLitres: 42.1, hourlyCo2Kg: 97.3, co2SavedKg: 23.3, ecoRating: "POOR — High Emissions Hotspot" },
        { junctionName: "Chathiram Bus Stand Junction", congestionLevel: "HEAVY", hourlyIdleFuelLitres: 34.5, hourlyCo2Kg: 79.7, co2SavedKg: 19.1, ecoRating: "MODERATE — Needs Dynamic Tuning" },
        { junctionName: "Srirangam Rajagopuram Junction", congestionLevel: "HEAVY", hourlyIdleFuelLitres: 28.6, hourlyCo2Kg: 66.1, co2SavedKg: 15.9, ecoRating: "MODERATE — Needs Dynamic Tuning" }
      ]
    };
  },

  // Registration
  async registerOfficer(payload) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (e) {
      return { message: "Officer registered locally in browser simulation mode." };
    }
  }
};

window.TrichyAPI = TrichyAPI;
window.TrichyMockDB = TrichyMockDB;
