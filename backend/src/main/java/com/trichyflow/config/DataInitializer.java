package com.trichyflow.config;

import com.trichyflow.model.*;
import com.trichyflow.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private JunctionRepository junctionRepository;
    @Autowired private RoadRepository roadRepository;
    @Autowired private HospitalRepository hospitalRepository;
    @Autowired private IncidentRepository incidentRepository;
    @Autowired private RoadBlockRepository roadBlockRepository;
    @Autowired private EmergencyVehicleRepository emergencyVehicleRepository;
    @Autowired private ChallanRepository challanRepository;
    @Autowired private TrafficNotificationRepository notificationRepository;
    @Autowired private AdvisoryRepository advisoryRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Users with BCrypt Hashed Passwords
        if (userRepository.count() == 0) {
            userRepository.save(new User("admin", passwordEncoder.encode("admin123"), "Commissioner S. Ramanathan", "ADMIN", "IPS-TR-01", "admin@trichyflow.gov.in", "+91 94431 10001"));
            userRepository.save(new User("police", passwordEncoder.encode("police123"), "Inspector M. Anbarasan", "TRAFFIC_POLICE", "TP-CHATH-42", "police@trichyflow.gov.in", "+91 94431 10002"));
            userRepository.save(new User("control", passwordEncoder.encode("control123"), "Operator K. Selvam", "CONTROL_ROOM", "CR-SYS-108", "control@trichyflow.gov.in", "+91 94431 10003"));
            userRepository.save(new User("sub_inspector_kavitha", passwordEncoder.encode("police123"), "SI Kavitha Sundaram", "TRAFFIC_POLICE", "TP-CENT-19", "kavitha.tp@trichyflow.gov.in", "+91 94431 10004"));
            userRepository.save(new User("citizen", passwordEncoder.encode("citizen123"), "Trichy Resident (Public User)", "PUBLIC", "CITIZEN-TN45", "citizen@trichyflow.gov.in", "+91 94431 10005"));
        }

        // 2. Seed 18 Trichy Junctions
        if (junctionRepository.count() == 0) {
            junctionRepository.save(new Junction(1L, "Chathiram Bus Stand Junction", "Near St. Joseph College & Old Bus Stand", 10.8285, 78.6948, "HEAVY", "North-South Green", 60, 40, 4.20, "ACTIVE", 85, 78, 45, 38));
            junctionRepository.save(new Junction(2L, "Main Guard Gate (Rockfort)", "Entry to Teppakulam & Rockfort Temple", 10.8262, 78.6974, "HEAVY", "East-West Green", 50, 45, 3.90, "ACTIVE", 65, 55, 72, 68));
            junctionRepository.save(new Junction(3L, "Thillai Nagar Main Road (11th Cross)", "Commercial Shopping & Clinic Hub", 10.8201, 78.6872, "MODERATE", "North-South Green", 45, 45, 2.80, "ACTIVE", 52, 48, 30, 25));
            junctionRepository.save(new Junction(4L, "Central Bus Stand Junction", "Intercity Bus Terminus & Hotel District", 10.7968, 78.6865, "CRITICAL", "North-South Green", 70, 35, 4.85, "ACTIVE", 110, 95, 80, 75));
            junctionRepository.save(new Junction(5L, "Trichy Railway Junction (Collectorate)", "Opposite Southern Railway Divisional HQ", 10.7932, 78.6834, "HEAVY", "East-West Green", 55, 40, 3.95, "ACTIVE", 75, 70, 85, 82));
            junctionRepository.save(new Junction(6L, "Cantonment Roundabout", "Near Head Post Office & District Court", 10.8035, 78.6870, "MODERATE", "Roundabout Circulating", 45, 45, 2.50, "ACTIVE", 40, 45, 42, 38));
            junctionRepository.save(new Junction(7L, "TVS Tollgate Junction", "NH-45 Madurai-Chennai Highway Convergence", 10.7871, 78.7042, "CRITICAL", "East-West Green", 65, 45, 4.60, "ACTIVE", 95, 90, 105, 98));
            junctionRepository.save(new Junction(8L, "Palakkarai Junction", "Heritage Overbridge & Goods Shed Road", 10.8122, 78.6981, "MODERATE", "North-South Green", 40, 45, 3.10, "ACTIVE", 48, 50, 35, 40));
            junctionRepository.save(new Junction(9L, "Woraiyur Nachiyar Kovil Cross", "Textile Heritage & Residential Arterial", 10.8228, 78.6754, "NORMAL", "North-South Green", 35, 45, 1.80, "ACTIVE", 28, 25, 20, 18));
            junctionRepository.save(new Junction(10L, "Srirangam Rajagopuram Junction", "Entrance to Sri Ranganathaswamy Temple", 10.8625, 78.6912, "HEAVY", "East-West Green", 50, 40, 3.80, "ACTIVE", 70, 68, 62, 58));
            junctionRepository.save(new Junction(11L, "Tiruvanaikoil Trunk Road Junction", "Jambukeswarar Akilandeswari Temple Route", 10.8532, 78.7055, "MODERATE", "North-South Green", 40, 40, 2.60, "ACTIVE", 45, 40, 38, 35));
            junctionRepository.save(new Junction(12L, "Ponmalai (Golden Rock) Market", "Railway Workshop Colony & Shandy Ground", 10.7785, 78.7214, "NORMAL", "North-South Green", 35, 45, 2.10, "ACTIVE", 32, 30, 25, 22));
            junctionRepository.save(new Junction(13L, "KK Nagar Sundar Nagar Signal", "Sundar Nagar Arterial towards Airport", 10.7712, 78.7058, "MODERATE", "North-South Green", 40, 45, 2.70, "ACTIVE", 45, 42, 35, 30));
            junctionRepository.save(new Junction(14L, "Trichy International Airport Junction", "Pudukkottai Highway & Terminal Access", 10.7645, 78.7189, "NORMAL", "East-West Green", 45, 45, 1.95, "ACTIVE", 35, 32, 40, 38));
            junctionRepository.save(new Junction(15L, "Thennur High Road Cross", "Anna Nagar & Uzhavar Sandhai Connector", 10.8145, 78.6878, "MODERATE", "East-West Green", 40, 45, 2.90, "ACTIVE", 44, 46, 50, 48));
            junctionRepository.save(new Junction(16L, "Crawford Post Office Signal", "Madurai Bypass connector & Military Camp", 10.7792, 78.6775, "NORMAL", "North-South Green", 30, 50, 1.70, "ACTIVE", 25, 22, 28, 24));
            junctionRepository.save(new Junction(17L, "Subramaniapuram Main Junction", "Prison Road & Airport Alternate Bypass", 10.7832, 78.6918, "MODERATE", "North-South Green", 40, 40, 2.45, "ACTIVE", 38, 36, 42, 40));
            junctionRepository.save(new Junction(18L, "Mambalasalai Cauvery Bridge Junction", "North Bridge Approach connecting Srirangam", 10.8421, 78.6985, "HEAVY", "North-South Green", 55, 40, 3.90, "ACTIVE", 82, 80, 40, 35));
        }

        // 3. Seed 6 Hospitals
        if (hospitalRepository.count() == 0) {
            hospitalRepository.save(new Hospital(1L, "Mahatma Gandhi Memorial Govt Hospital (Trichy GH)", "Near Collectorate, Cantonment", 10.8062, 78.6854, "+91 431 2415555", 45, 32, "AVAILABLE", 6L));
            hospitalRepository.save(new Hospital(2L, "Kauvery Hospital (Cantonment)", "Tennur High Road & Cantonment", 10.8085, 78.6872, "+91 431 4006000", 30, 24, "AVAILABLE", 15L));
            hospitalRepository.save(new Hospital(3L, "Apollo Speciality Hospitals", "Old Thanjavur Road, Ariyamangalam", 10.8012, 78.7180, "+91 431 3986000", 25, 18, "AVAILABLE", 7L));
            hospitalRepository.save(new Hospital(4L, "Cethar Hospitals", "11th Cross, Thillai Nagar West", 10.8215, 78.6841, "+91 431 2760000", 20, 19, "BUSY", 3L));
            hospitalRepository.save(new Hospital(5L, "Frontline Hospital", "Williams Road, Cantonment", 10.7995, 78.6881, "+91 431 2414141", 15, 8, "AVAILABLE", 4L));
            hospitalRepository.save(new Hospital(6L, "Child Jesus Hospital", "Pudukkottai Main Road, Cantonment", 10.7915, 78.6922, "+91 431 2412233", 18, 17, "BUSY", 17L));
        }

        // 4. Seed 22 Roads
        if (roadRepository.count() == 0) {
            roadRepository.save(new Road(1L, "Cauvery River Trunk Road (Chathiram to Mambalasalai)", 1L, 18L, 1.60, 50, 32, 4, "OPEN", "[[10.8285, 78.6948], [10.8350, 78.6965], [10.8421, 78.6985]]"));
            roadRepository.save(new Road(2L, "Srirangam Bridge Arterial (Mambalasalai to Rajagopuram)", 18L, 10L, 2.40, 50, 28, 4, "OPEN", "[[10.8421, 78.6985], [10.8520, 78.6950], [10.8625, 78.6912]]"));
            roadRepository.save(new Road(3L, "Thiruvanaikoil Bypass Road", 18L, 11L, 1.50, 45, 38, 4, "OPEN", "[[10.8421, 78.6985], [10.8475, 78.7015], [10.8532, 78.7055]]"));
            roadRepository.save(new Road(4L, "College Road (Chathiram to Main Guard Gate)", 1L, 2L, 0.45, 30, 18, 2, "CONGESTED", "[[10.8285, 78.6948], [10.8270, 78.6960], [10.8262, 78.6974]]"));
            roadRepository.save(new Road(5L, "Karur Bypass Road (Chathiram to Thillai Nagar)", 1L, 3L, 1.20, 45, 25, 4, "OPEN", "[[10.8285, 78.6948], [10.8245, 78.6905], [10.8201, 78.6872]]"));
            roadRepository.save(new Road(6L, "Woraiyur Link (Thillai Nagar to Woraiyur Nachiyar)", 3L, 9L, 1.40, 35, 30, 2, "OPEN", "[[10.8201, 78.6872], [10.8215, 78.6810], [10.8228, 78.6754]]"));
            roadRepository.save(new Road(7L, "Thennur High Road (Thillai Nagar to Thennur Cross)", 3L, 15L, 0.85, 35, 22, 4, "OPEN", "[[10.8201, 78.6872], [10.8170, 78.6875], [10.8145, 78.6878]]"));
            roadRepository.save(new Road(8L, "Palakkarai Main Road (Main Guard Gate to Palakkarai)", 2L, 8L, 1.65, 40, 24, 2, "OPEN", "[[10.8262, 78.6974], [10.8190, 78.6980], [10.8122, 78.6981]]"));
            roadRepository.save(new Road(9L, "Heber Road (Thennur to Cantonment Roundabout)", 15L, 6L, 1.25, 45, 34, 4, "OPEN", "[[10.8145, 78.6878], [10.8090, 78.6874], [10.8035, 78.6870]]"));
            roadRepository.save(new Road(10L, "Williams Road (Cantonment to Central Bus Stand)", 6L, 4L, 0.90, 40, 15, 4, "CONGESTED", "[[10.8035, 78.6870], [10.8000, 78.6868], [10.7968, 78.6865]]"));
            roadRepository.save(new Road(11L, "Collectorate Link (Central Bus Stand to Railway Junction)", 4L, 5L, 0.60, 35, 12, 4, "CONGESTED", "[[10.7968, 78.6865], [10.7950, 78.6850], [10.7932, 78.6834]]"));
            roadRepository.save(new Road(12L, "Dindigul Road (Railway Junction to Crawford)", 5L, 16L, 1.70, 50, 42, 4, "OPEN", "[[10.7932, 78.6834], [10.7860, 78.6800], [10.7792, 78.6775]]"));
            roadRepository.save(new Road(13L, "Pudukkottai Highway (Central Bus Stand to Subramaniapuram)", 4L, 17L, 1.60, 50, 36, 4, "OPEN", "[[10.7968, 78.6865], [10.7900, 78.6890], [10.7832, 78.6918]]"));
            roadRepository.save(new Road(14L, "TVS Tollgate Link (Subramaniapuram to TVS Tollgate)", 17L, 7L, 1.45, 50, 20, 4, "CONGESTED", "[[10.7832, 78.6918], [10.7850, 78.6980], [10.7871, 78.7042]]"));
            roadRepository.save(new Road(15L, "Palakkarai Overbridge to TVS Tollgate", 8L, 7L, 2.90, 45, 32, 4, "OPEN", "[[10.8122, 78.6981], [10.7990, 78.7010], [10.7871, 78.7042]]"));
            roadRepository.save(new Road(16L, "NH-45 Madurai Bypass (TVS Tollgate to KK Nagar)", 7L, 13L, 1.80, 60, 48, 6, "OPEN", "[[10.7871, 78.7042], [10.7790, 78.7050], [10.7712, 78.7058]]"));
            roadRepository.save(new Road(17L, "Airport Road (KK Nagar to International Airport)", 13L, 14L, 1.60, 60, 52, 4, "OPEN", "[[10.7712, 78.7058], [10.7680, 78.7120], [10.7645, 78.7189]]"));
            roadRepository.save(new Road(18L, "Ponmalai GOC Road (TVS Tollgate to Golden Rock)", 7L, 12L, 2.10, 40, 34, 2, "OPEN", "[[10.7871, 78.7042], [10.7825, 78.7130], [10.7785, 78.7214]]"));
            roadRepository.save(new Road(19L, "Golden Rock to Airport Outer Ring", 12L, 14L, 1.75, 45, 40, 2, "OPEN", "[[10.7785, 78.7214], [10.7710, 78.7200], [10.7645, 78.7189]]"));
            roadRepository.save(new Road(20L, "Court Road / GH Access (Cantonment Roundabout to Trichy GH)", 6L, 1L, 0.40, 30, 25, 2, "OPEN", "[[10.8035, 78.6870], [10.8050, 78.6860], [10.8062, 78.6854]]"));
            roadRepository.save(new Road(21L, "Thillai Nagar 1st Cross Flyover Road", 3L, 2L, 1.20, 40, 0, 2, "FULLY_BLOCKED", "[[10.8201, 78.6872], [10.8230, 78.6920], [10.8262, 78.6974]]"));
            roadRepository.save(new Road(22L, "Old Palakkarai Bazar Link", 8L, 15L, 1.10, 30, 15, 2, "PARTIALLY_BLOCKED", "[[10.8122, 78.6981], [10.8135, 78.6925], [10.8145, 78.6878]]"));
        }

        // 5. Seed 10 Incidents
        if (incidentRepository.count() == 0) {
            incidentRepository.save(new Incident(1L, "ACCIDENT", "Central Bus Stand Exit Gate near Royal Hotel", 10.7965, 78.6868, "CRITICAL", 3, 2, "Collision between TNSTC passenger bus and auto-rickshaw. Northbound lane obstructed.", "Traffic Constable Murugan", "REPORTED", "Divert via Williams Road and Cantonment Roundabout"));
            incidentRepository.save(new Incident(2L, "ACCIDENT", "Chathiram Bus Stand near College Road Corner", 10.8282, 78.6952, "HIGH", 2, 1, "Two-wheeler collision with delivery truck. Road clearance under way.", "SI Kavitha Sundaram", "DISPATCHED", "Route via Karur Bypass Road"));
            incidentRepository.save(new Incident(3L, "VEHICLE_BREAKDOWN", "Mambalasalai Cauvery Bridge North Span", 10.8415, 78.6982, "MEDIUM", 1, 0, "Heavy container trailer axle breakdown on bridge approach lane.", "Highway Patrol 3", "RESOLVING", "Use Thiruvanaikoil old bridge for light vehicles"));
            incidentRepository.save(new Incident(4L, "WATER_LOGGING", "TVS Tollgate Underpass Subway", 10.7868, 78.7038, "HIGH", 0, 0, "Flash rain runoff accumulated 2.5 ft water in the subway.", "Control Room Sensors", "REPORTED", "Reroute via Subramaniapuram Overbridge"));
            incidentRepository.save(new Incident(5L, "ACCIDENT", "Thillai Nagar 11th Cross near Shopping Mall", 10.8205, 78.6875, "MEDIUM", 2, 0, "Rear-end fender bender between two private hatchbacks.", "Beat Officer Ramesh", "RESOLVED", "None - lane cleared"));
            incidentRepository.save(new Incident(6L, "FALLEN_TREE", "Woraiyur Nachiyar Temple Street", 10.8222, 78.6750, "HIGH", 1, 0, "Large Banyan tree branch fallen across electric cables.", "Woraiyur Station SI", "RESOLVING", "Traffic diverted through Salai Road"));
            incidentRepository.save(new Incident(7L, "OIL_SPILL", "Palakkarai Overbridge Incline", 10.8125, 78.6985, "CRITICAL", 4, 3, "Spilled hydraulic oil caused skidding of three two-wheelers.", "Patrol Unit 07", "DISPATCHED", "Sand spreading in progress; use Goods Shed road"));
            incidentRepository.save(new Incident(8L, "ACCIDENT", "KK Nagar Sundar Nagar Signal", 10.7715, 78.7062, "LOW", 2, 0, "Minor scrape between city bus and motorcycle.", "Public Emergency Call", "RESOLVED", "Cleared by local traffic patrol"));
            incidentRepository.save(new Incident(9L, "VEHICLE_BREAKDOWN", "Trichy Railway Junction Station Approach", 10.7930, 78.6830, "MEDIUM", 1, 0, "Airport shuttle mini-bus clutch failure blocking lane 2.", "Station Traffic Booth", "REPORTED", "Traffic diverted to station parcel office lane"));
            incidentRepository.save(new Incident(10L, "ACCIDENT", "Srirangam Amma Mandapam Ghat Road", 10.8580, 78.6890, "MEDIUM", 2, 1, "Devotee van collided with parked light commercial vehicle.", "Srirangam Traffic Police", "RESOLVING", "Divert via North Gate Outer Road"));
        }

        // 6. Seed 2 Road Blocks
        if (roadBlockRepository.count() == 0) {
            roadBlockRepository.save(new RoadBlock(1L, 21L, "Thillai Nagar 1st Cross Flyover Road", "Underground Drainage Pipe Laying (UGD Project)", "2026-09-18 08:00:00", "2026-09-24 18:00:00", "COMPLETE", "ACTIVE", "Road completely dug up; divert all light traffic via Salai Road and Karur Bypass"));
            roadBlockRepository.save(new RoadBlock(2L, 22L, "Old Palakkarai Bazar Link", "Culvert Reconstruction & Storm Drain Concrete Work", "2026-09-19 09:00:00", "2026-09-22 20:00:00", "PARTIAL", "ACTIVE", "One-way restriction enforced; heavy vehicles strictly rerouted through TVS Tollgate"));
        }

        // 7. Seed 5 Emergency Vehicles
        if (emergencyVehicleRepository.count() == 0) {
            emergencyVehicleRepository.save(new EmergencyVehicle(1L, "AMB-108-A", "AMBULANCE", 10.8285, 78.6948, 1L, 1L, "CRITICAL", "EN_ROUTE", "R. Manikandan", "+91 98421 00108"));
            emergencyVehicleRepository.save(new EmergencyVehicle(2L, "AMB-108-B", "AMBULANCE", 10.8625, 78.6912, 10L, 2L, "HIGH", "IDLE", "S. Vigneshwaran", "+91 98421 00109"));
            emergencyVehicleRepository.save(new EmergencyVehicle(3L, "FIRE-TENDER-01", "FIRE_TRUCK", 10.8035, 78.6870, 6L, null, "CRITICAL", "IDLE", "Station Officer G. Pandian", "+91 94431 00101"));
            emergencyVehicleRepository.save(new EmergencyVehicle(4L, "PATROL-PCR-05", "POLICE", 10.7968, 78.6865, 4L, null, "HIGH", "EN_ROUTE", "Head Constable K. Murugan", "+91 94431 00100"));
            emergencyVehicleRepository.save(new EmergencyVehicle(5L, "AMB-KAUVERY-03", "AMBULANCE", 10.7871, 78.7042, 7L, 2L, "CRITICAL", "IDLE", "V. Anthony Raj", "+91 98421 00110"));
        }

        // 8. Seed 35 E-Challans
        if (challanRepository.count() == 0) {
            challanRepository.save(new Challan(1L, "TN45AB1234", "S. Sivakumar", "Signal Jump", "Chathiram Bus Stand Junction", 1000.0, "UNPAID", "SI Kavitha Sundaram", "evidence/cam01_0920.jpg"));
            challanRepository.save(new Challan(2L, "TN48CD5678", "P. Radhakrishnan", "Speeding", "NH-45 TVS Tollgate Bypass", 1500.0, "PAID", "Inspector M. Anbarasan", "evidence/speed04_0819.jpg"));
            challanRepository.save(new Challan(3L, "TN55EF9012", "M. Karthikeyan", "No Helmet", "Thillai Nagar 11th Cross", 1000.0, "PENDING", "HC R. Periyasamy", "evidence/cam03_0911.jpg"));
            challanRepository.save(new Challan(4L, "TN45BK4499", "D. Anand Babu", "Wrong Parking", "Main Guard Gate Teppakulam Bazaar", 500.0, "UNPAID", "SI Kavitha Sundaram", "evidence/park01_0912.jpg"));
            challanRepository.save(new Challan(5L, "TN48Z1102", "K. Meenakshi Sundaram", "Dangerous Driving", "Cantonment Roundabout", 2000.0, "PENDING", "Inspector M. Anbarasan", "evidence/dash02_0915.jpg"));
            challanRepository.save(new Challan(6L, "TN45CC8831", "G. Balasubramanian", "No Seat Belt", "Trichy Railway Junction Station Road", 1000.0, "PAID", "HC S. Ganesan", "evidence/cam05_0917.jpg"));
            challanRepository.save(new Challan(7L, "TN45DD2341", "R. Velmurugan", "Driving Without License", "Woraiyur Nachiyar Kovil", 5000.0, "UNPAID", "SI T. Rajendran", "evidence/chk01_0918.jpg"));
            challanRepository.save(new Challan(8L, "TN48AA7765", "A. Mohammed Farooq", "Signal Jump", "Central Bus Stand Signal", 1000.0, "PENDING", "HC K. Murugan", "evidence/cam04_0919.jpg"));
            challanRepository.save(new Challan(9L, "TN55K9090", "J. Suresh Kumar", "Speeding", "Airport Outer Ring Road", 1500.0, "PAID", "SI V. Dhanapal", "evidence/speed11_0920.jpg"));
            challanRepository.save(new Challan(10L, "TN45AW3312", "T. Saravanan", "No Helmet", "Palakkarai Overbridge Incline", 1000.0, "UNPAID", "HC M. Raman", "evidence/cam08_0920.jpg"));
            challanRepository.save(new Challan(11L, "TN48BB4321", "V. Lakshmi Narayanan", "Signal Jump", "TVS Tollgate Junction", 1000.0, "UNPAID", "Inspector M. Anbarasan", "evidence/cam07_0920.jpg"));
            challanRepository.save(new Challan(12L, "TN45XY9812", "E. Charles Robert", "Dangerous Driving", "Mambalasalai Cauvery Bridge", 2000.0, "PENDING", "SI Kavitha Sundaram", "evidence/cam18_0920.jpg"));
            challanRepository.save(new Challan(13L, "TN48CD1122", "N. Muthulakshmi", "Wrong Parking", "Srirangam South Chitra Street", 500.0, "PAID", "HC P. Karuppan", "evidence/park03_0918.jpg"));
            challanRepository.save(new Challan(14L, "TN45QQ4433", "K. Balamurugan", "No Seat Belt", "KK Nagar Sundar Nagar", 1000.0, "PENDING", "SI V. Dhanapal", "evidence/cam13_0919.jpg"));
            challanRepository.save(new Challan(15L, "TN55MM7788", "S. Pradeep Kumar", "Driving Without License", "Crawford Post Office Signal", 5000.0, "UNPAID", "SI T. Rajendran", "evidence/chk03_0919.jpg"));
            challanRepository.save(new Challan(16L, "TN45RT8811", "M. Aravind Swamy", "Speeding", "Karur Bypass Arterial", 1500.0, "PAID", "SI Kavitha Sundaram", "evidence/speed02_0919.jpg"));
            challanRepository.save(new Challan(17L, "TN48KL5566", "R. Deepa Chandran", "Signal Jump", "Thennur High Road Cross", 1000.0, "UNPAID", "HC S. Ganesan", "evidence/cam15_0919.jpg"));
            challanRepository.save(new Challan(18L, "TN45ZX3399", "B. Dinesh Kumar", "No Helmet", "Ponmalai Golden Rock Market", 1000.0, "PAID", "HC M. Raman", "evidence/cam12_0919.jpg"));
            challanRepository.save(new Challan(19L, "TN48MN6677", "P. Senthil Nathan", "Dangerous Driving", "Airport Terminal Access Road", 2000.0, "PENDING", "SI V. Dhanapal", "evidence/dash04_0919.jpg"));
            challanRepository.save(new Challan(20L, "TN45JJ9900", "V. Geetha Govind", "Wrong Parking", "Williams Road Cantonment", 500.0, "UNPAID", "Inspector M. Anbarasan", "evidence/park05_0919.jpg"));
            challanRepository.save(new Challan(21L, "TN55EE1133", "H. Harishankar", "Signal Jump", "Subramaniapuram Junction", 1000.0, "PENDING", "HC K. Murugan", "evidence/cam17_0920.jpg"));
            challanRepository.save(new Challan(22L, "TN45PP2244", "C. Cyril Prakash", "No Seat Belt", "Tiruvanaikoil Trunk Road", 1000.0, "PAID", "SI Kavitha Sundaram", "evidence/cam11_0920.jpg"));
            challanRepository.save(new Challan(23L, "TN48QQ3355", "L. Loganathan", "Driving Without License", "Chathiram Old Bus Stand", 5000.0, "UNPAID", "SI Kavitha Sundaram", "evidence/chk04_0920.jpg"));
            challanRepository.save(new Challan(24L, "TN45WW4466", "N. Nithya Kalyani", "Speeding", "NH-45 Madurai Bypass", 1500.0, "PAID", "Inspector M. Anbarasan", "evidence/speed05_0920.jpg"));
            challanRepository.save(new Challan(25L, "TN48RR5577", "T. Tamilselvan", "No Helmet", "Woraiyur Market Road", 1000.0, "PENDING", "SI T. Rajendran", "evidence/cam09_0920.jpg"));
            challanRepository.save(new Challan(26L, "TN45SS6688", "W. Wilfred Joseph", "Signal Jump", "Central Bus Stand Junction", 1000.0, "UNPAID", "HC K. Murugan", "evidence/cam04_0920.jpg"));
            challanRepository.save(new Challan(27L, "TN48TT7799", "Y. Yogeshwaran", "Dangerous Driving", "Chathiram College Road", 2000.0, "PENDING", "SI Kavitha Sundaram", "evidence/dash05_0920.jpg"));
            challanRepository.save(new Challan(28L, "TN55UU8800", "Z. Zakir Hussain", "Wrong Parking", "Main Guard Gate Bazaar", 500.0, "PAID", "HC R. Periyasamy", "evidence/park06_0920.jpg"));
            challanRepository.save(new Challan(29L, "TN45VV9911", "S. Shalini Priyadarshini", "No Seat Belt", "Thillai Nagar West Extn", 1000.0, "PAID", "HC S. Ganesan", "evidence/cam03_0920.jpg"));
            challanRepository.save(new Challan(30L, "TN48WW1122", "M. Madhan Mohan", "Speeding", "Airport Outer Ring", 1500.0, "PENDING", "SI V. Dhanapal", "evidence/speed12_0920.jpg"));
            challanRepository.save(new Challan(31L, "TN45XX2233", "R. Revathi Sankar", "Driving Without License", "TVS Tollgate Underpass", 5000.0, "UNPAID", "Inspector M. Anbarasan", "evidence/chk05_0920.jpg"));
            challanRepository.save(new Challan(32L, "TN48YY3344", "K. Kaviya Varshini", "No Helmet", "Palakkarai Roundabout", 1000.0, "PAID", "HC M. Raman", "evidence/cam08_0920.jpg"));
            challanRepository.save(new Challan(33L, "TN55ZZ4455", "B. Bhuvaneshwari", "Signal Jump", "Cantonment Signal", 1000.0, "PENDING", "Inspector M. Anbarasan", "evidence/cam06_0920.jpg"));
            challanRepository.save(new Challan(34L, "TN45AA5566", "A. Ashwin Kumar", "Wrong Parking", "Rockfort Teppakulam Corner", 500.0, "UNPAID", "SI Kavitha Sundaram", "evidence/park07_0920.jpg"));
            challanRepository.save(new Challan(35L, "TN48BB6677", "O. Om Prakash", "Speeding", "Srirangam Bypass Link", 1500.0, "PAID", "SI Kavitha Sundaram", "evidence/speed08_0920.jpg"));
        }

        // 9. Seed Notifications
        if (notificationRepository.count() == 0) {
            notificationRepository.save(new TrafficNotification(1L, "Emergency Corridor Activated", "Ambulance AMB-108-A dispatched towards Mahatma Gandhi Memorial Govt Hospital. Priority corridor engaged.", "EMERGENCY", "CRITICAL", false));
            notificationRepository.save(new TrafficNotification(2L, "Major Accident at Central Bus Stand", "Multi-vehicle collision reported near Royal Hotel. Police patrol & ambulance dispatched.", "ACCIDENT", "HIGH", false));
            notificationRepository.save(new TrafficNotification(3L, "High Congestion Warning: TVS Tollgate", "Vehicular queue extends over 1.2 km on NH-45 approach. Signal timing recommendation generated (+15s East-West).", "CONGESTION", "HIGH", false));
            notificationRepository.save(new TrafficNotification(4L, "Road Block Notice: Thillai Nagar 1st Cross", "UGD pipe laying active. Diversion in place via Karur Bypass Road.", "WARNING", "NORMAL", true));
            notificationRepository.save(new TrafficNotification(5L, "Weather Alert: Heavy Downpour Imminent", "Regional Met Centre issues heavy rain forecast for Trichy Corporation. Low-lying subways monitored.", "INFO", "NORMAL", true));
        }

        // 10. Seed Citizen Advisories
        if (advisoryRepository.count() == 0) {
            advisoryRepository.save(new Advisory(
                "Cauvery River Bridge Maintenance Advisory",
                "Periodic expansion joint inspection on Old Cauvery Bridge between Chathiram and Mambalasalai. Heavy commercial vehicles and multi-axle trucks are advised to take the Odathurai Overbridge detour.",
                "WARNING",
                "Chathiram Bus Stand, Mambalasalai",
                "Odathurai Overbridge via Sanjeevi Nagar",
                "Trichy City Traffic Police HQ"
            ));
            advisoryRepository.save(new Advisory(
                "Srirangam Ranganathaswamy Temple Special Flow",
                "Heavy pilgrim footfall anticipated for evening darshan. One-way traffic system enforced on South Chitra Street and Gandhi Road.",
                "INFO",
                "Srirangam Rajagopuram Junction",
                "Amma Mandapam Bypass",
                "Srirangam Traffic Police Station"
            ));
            advisoryRepository.save(new Advisory(
                "TVS Tollgate Highway Convergence Congestion Alert",
                "Madurai-Chennai National Highway approach experiencing heavy vehicular volume due to holiday return rush. Light motor vehicles are encouraged to divert via Crawford / Cantonment ring.",
                "CRITICAL",
                "TVS Tollgate Junction",
                "Subramaniapuram Airport Alternate Link",
                "National Highway Patrol Unit 4"
            ));
            advisoryRepository.save(new Advisory(
                "Monsoon Waterlogging Warning: Palakkarai Subway",
                "Heavy thunderstorm warning. Caution advised near Palakkarai rail underpass. Pumps deployed and running continuously.",
                "WARNING",
                "Palakkarai Junction",
                "Good Shed Road Overbridge",
                "Trichy Corporation Disaster Response"
            ));
        }
    }
}
