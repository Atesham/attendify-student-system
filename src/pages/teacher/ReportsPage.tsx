
// import { useState } from "react";
// import { useRef } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import { Button } from "@/components/ui/button";
// import { 
//   Card, CardContent, CardDescription, CardHeader, CardTitle 
// } from "@/components/ui/card";
// import { ChartContainer } from "@/components/ui/chart";
// import { 
//   Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
// } from "@/components/ui/table";
// import { 
//   PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
// } from "recharts";
// import { ArrowLeft, Download } from "lucide-react";

// // Mock data for the charts
// const pieData = [
//   { name: "Present", value: 85 },
//   { name: "Absent", value: 15 },
// ];

// const COLORS = ["#8B5CF6", "#E5E7EB"];

// const lineData = [
//   { name: "Mon", attendance: 42 },
//   { name: "Tue", attendance: 38 },
//   { name: "Wed", attendance: 45 },
//   { name: "Thu", attendance: 40 },
//   { name: "Fri", attendance: 35 },
// ];

// const studentData = [
//   { id: "S1001", name: "Alice Johnson", attendance: 95, status: "Excellent" },
//   { id: "S1002", name: "Bob Smith", attendance: 82, status: "Good" },
//   { id: "S1003", name: "Carol Williams", attendance: 75, status: "Satisfactory" },
//   { id: "S1004", name: "David Brown", attendance: 68, status: "At Risk" },
//   { id: "S1005", name: "Eve Davis", attendance: 90, status: "Excellent" },
// ];

// const ReportsPage = () => {
//     const reportRef = useRef<HTMLDivElement>(null);

//   const { userData } = useAuth();
//   const navigate = useNavigate();
//   const [selectedPeriod, setSelectedPeriod] = useState("week");

//   // Type guard to ensure userData is Teacher
//   if (userData?.role !== "teacher") {
//     return null;
//   }

//   const config = {
//     attendance: {
//       label: "Attendance",
//       color: "#8B5CF6",
//     },
//   };

//    const handleExport = async () => {
//     if (!reportRef.current) return;

//     try {
//       const canvas = await html2canvas(reportRef.current, {
//         scale: 2, // Higher quality
//         logging: false,
//         useCORS: true,
//       });

//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgWidth = 210; // A4 width in mm
//       const pageHeight = 295; // A4 height in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       // Add new pages if content is longer than one page
//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(`attendance-report-${new Date().toISOString().slice(0, 10)}.pdf`);
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="container mx-auto px-4 py-4 md:py-6 flex items-center">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => navigate("/teacher/dashboard")}
//             className="mr-2"
//           >
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//           <h1 className="text-xl md:text-2xl font-bold text-foreground">
//             Attendance Reports
//           </h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-6 md:py-8">
//         {/* Period Selector */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex space-x-2">
//             <Button 
//               variant={selectedPeriod === "week" ? "default" : "outline"}
//               onClick={() => setSelectedPeriod("week")}
//             >
//               Week
//             </Button>
//             <Button 
//               variant={selectedPeriod === "month" ? "default" : "outline"}
//               onClick={() => setSelectedPeriod("month")}
//             >
//               Month
//             </Button>
//             <Button 
//               variant={selectedPeriod === "semester" ? "default" : "outline"}
//               onClick={() => setSelectedPeriod("semester")}
//             >
//               Semester
//             </Button>
//           </div>
//             <Button variant="outline" onClick={handleExport}>
//         <Download className="h-4 w-4 mr-2" />
//         Export Report
//       </Button>
//               </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Attendance Overview</CardTitle>
//               <CardDescription>
//                 Overall attendance percentage
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex justify-center">
//               <div className="h-[250px] w-full">
//                 <ChartContainer config={config}>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={90}
//                       paddingAngle={5}
//                       dataKey="value"
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ChartContainer>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Daily Attendance Trend</CardTitle>
//               <CardDescription>
//                 Number of students present each day
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[250px] w-full">
//                 <ChartContainer config={config}>
//                   <ResponsiveContainer>
//                     <LineChart data={lineData}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="attendance"
//                         stroke="#8B5CF6"
//                         activeDot={{ r: 8 }}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </ChartContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Student Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Student Attendance Report</CardTitle>
//             <CardDescription>
//               Detailed attendance records by student
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Student ID</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Attendance %</TableHead>
//                   <TableHead>Status</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {studentData.map((student) => (
//                   <TableRow key={student.id}>
//                     <TableCell>{student.id}</TableCell>
//                     <TableCell>{student.name}</TableCell>
//                     <TableCell>{student.attendance}%</TableCell>
//                     <TableCell>
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-medium ${
//                           student.status === "Excellent"
//                             ? "bg-green-100 text-green-800"
//                             : student.status === "Good"
//                             ? "bg-blue-100 text-blue-800"
//                             : student.status === "Satisfactory"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {student.status}
//                       </span>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// };

// export default ReportsPage;




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { ArrowLeft, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Mock data for the charts
const pieData = [
  { name: "Present", value: 85 },
  { name: "Absent", value: 15 },
];

const COLORS = ["#8B5CF6", "#E5E7EB"];

const lineData = [
  { name: "Mon", attendance: 42 },
  { name: "Tue", attendance: 38 },
  { name: "Wed", attendance: 45 },
  { name: "Thu", attendance: 40 },
  { name: "Fri", attendance: 35 },
];

const studentData = [
  { id: "S1001", name: "Alice Johnson", attendance: 95, status: "Excellent" },
  { id: "S1002", name: "Bob Smith", attendance: 82, status: "Good" },
  { id: "S1003", name: "Carol Williams", attendance: 75, status: "Satisfactory" },
  { id: "S1004", name: "David Brown", attendance: 68, status: "At Risk" },
  { id: "S1005", name: "Eve Davis", attendance: 90, status: "Excellent" },
];

const ReportsPage = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Type guard to ensure userData is Teacher
  if (userData?.role !== "teacher") {
    return null;
  }

  const handleExport = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Student Attendance Report", 14, 20);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
    
    // Prepare data for the table
    const tableData = studentData.map(student => [
      student.id,
      student.name,
      `${student.attendance}%`,
      student.status
    ]);
    
    // Add table using autoTable plugin
    autoTable(doc, {
      head: [['Student ID', 'Name', 'Attendance %', 'Status']],
      body: tableData,
      startY: 35,
      styles: {
        cellPadding: 5,
        fontSize: 10,
        valign: 'middle',
        halign: 'left'
      },
      headStyles: {
        fillColor: [139, 92, 246], // Purple color
        textColor: 255 // White text
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 40 },
        2: { cellWidth: 25 },
        3: { cellWidth: 30 }
      },
      didDrawCell: (data) => {
        // Add color coding for status cells
        if (data.column.index === 3 && data.section === 'body') {
              const status = data.cell.raw as string;

          let color: number[] = [];
          
          if (status === "Excellent") color = [220, 252, 231]; // Green
          else if (status === "Good") color = [219, 234, 254]; // Blue
          else if (status === "Satisfactory") color = [254, 249, 195]; // Yellow
          else color = [254, 226, 226]; // Red
          
          doc.setFillColor(color[0], color[1], color[2]);
          doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
          doc.setTextColor(0, 0, 0); // Black text
          doc.text(status, data.cell.x + 2, data.cell.y + 7);
        }
      }
    });
    
    // Add summary statistics
    const totalStudents = studentData.length;
    const avgAttendance = studentData.reduce((sum, student) => sum + student.attendance, 0) / totalStudents;
    
    doc.setFontSize(12);
    const finalY = (doc as any).lastAutoTable?.finalY || 35;
    doc.text(`Total Students: ${totalStudents}`, 14, finalY + 15);
    doc.text(`Average Attendance: ${avgAttendance.toFixed(1)}%`, 14, finalY + 25);
    
    // Save the PDF
    doc.save(`student-attendance-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const config = {
    attendance: {
      label: "Attendance",
      color: "#8B5CF6",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/teacher/dashboard")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Attendance Reports
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Period Selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <Button 
              variant={selectedPeriod === "week" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("week")}
            >
              Week
            </Button>
            <Button 
              variant={selectedPeriod === "month" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("month")}
            >
              Month
            </Button>
            <Button 
              variant={selectedPeriod === "semester" ? "default" : "outline"}
              onClick={() => setSelectedPeriod("semester")}
            >
              Semester
            </Button>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Student Report
          </Button>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>
                Overall attendance percentage
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[250px] w-full">
                <ChartContainer config={config}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Trend</CardTitle>
              <CardDescription>
                Number of students present each day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ChartContainer config={config}>
                  <ResponsiveContainer>
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="attendance"
                        stroke="#8B5CF6"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance Report</CardTitle>
            <CardDescription>
              Detailed attendance records by student
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Attendance %</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.attendance}%</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : student.status === "Good"
                            ? "bg-blue-100 text-blue-800"
                            : student.status === "Satisfactory"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReportsPage;