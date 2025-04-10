
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  db, 
  addFAQ,
  getFAQs, 
  setUserAsAdmin
} from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [emailToPromote, setEmailToPromote] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch users and FAQs on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersQuery = query(collection(db, "users"));
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(usersData);
        
        // Fetch FAQs
        const faqsData = await getFAQs() as FAQ[];
        setFaqs(faqsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data. Please refresh the page.",
          variant: "destructive"
        });
      }
    };
    
    fetchData();
  }, [toast]);

  const handleAddFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both question and answer fields.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const faqId = await addFAQ(newQuestion, newAnswer);
      
      setFaqs(prev => [
        ...prev,
        {
          id: faqId,
          question: newQuestion,
          answer: newAnswer
        }
      ]);
      
      setNewQuestion('');
      setNewAnswer('');
      
      toast({
        title: "Success",
        description: "FAQ has been added successfully."
      });
    } catch (error) {
      console.error("Error adding FAQ:", error);
      toast({
        title: "Error",
        description: "Failed to add FAQ. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePromoteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailToPromote.trim()) {
      toast({
        title: "Error",
        description: "Please enter a user email.",
        variant: "destructive"
      });
      return;
    }
    
    const userToPromote = users.find(user => user.email === emailToPromote);
    
    if (!userToPromote) {
      toast({
        title: "Error",
        description: "User with this email not found.",
        variant: "destructive"
      });
      return;
    }
    
    if (userToPromote.role === "admin") {
      toast({
        title: "Info",
        description: "This user is already an admin."
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await setUserAsAdmin(userToPromote.id);
      
      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === userToPromote.id ? { ...user, role: "admin" } : user
      ));
      
      setEmailToPromote('');
      
      toast({
        title: "Success",
        description: `${userToPromote.displayName || userToPromote.email} has been promoted to admin.`
      });
    } catch (error) {
      console.error("Error promoting user:", error);
      toast({
        title: "Error",
        description: "Failed to promote user. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>
      
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        
        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Promote User to Admin</CardTitle>
              <CardDescription>
                Give admin privileges to existing users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePromoteUser} className="space-y-4">
                <div className="grid gap-2">
                  <Input
                    type="email"
                    placeholder="User Email"
                    value={emailToPromote}
                    onChange={(e) => setEmailToPromote(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-zithara-500 hover:bg-zithara-600"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Promote to Admin"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                Manage users and their roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              {users.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.displayName || "N/A"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={user.role === "admin" ? "text-green-600 font-medium" : ""}>
                            {user.role === "admin" ? "Admin" : "User"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No users found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New FAQ</CardTitle>
              <CardDescription>
                Create a new frequently asked question
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddFAQ} className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="question">Question</label>
                  <Input
                    id="question"
                    placeholder="Enter the question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="answer">Answer</label>
                  <Textarea
                    id="answer"
                    placeholder="Enter the answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-zithara-500 hover:bg-zithara-600"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add FAQ"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Existing FAQs</CardTitle>
              <CardDescription>
                View and manage frequently asked questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {faqs.length > 0 ? (
                <div className="space-y-4">
                  {faqs.map(faq => (
                    <div key={faq.id} className="border rounded-md p-4">
                      <h3 className="font-medium text-lg">{faq.question}</h3>
                      <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No FAQs found. Add your first FAQ above.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
