
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NameModificationDialogProps {
  initialTitle: "mr" | "mrs" | undefined;
  initialFirstName: string;
  initialLastName: string;
  userId: string;
  onUpdate: (title: "mr" | "mrs", firstName: string, lastName: string) => void;
}

export function NameModificationDialog({
  initialTitle,
  initialFirstName,
  initialLastName,
  userId,
  onUpdate,
}: NameModificationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<"mr" | "mrs" | undefined>(initialTitle);
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !title) {
      toast({
        variant: "destructive",
        title: t.profile.general.errors.requiredFields,
        description: t.profile.general.errors.nameRequired,
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          title: title,
        })
        .eq('user_id', userId);

      if (error) throw error;

      onUpdate(title, firstName.trim(), lastName.trim());
      toast({
        title: t.profile.general.success.title,
        description: t.profile.general.success.nameUpdated,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating name:', error);
      toast({
        variant: "destructive",
        title: t.profile.general.errors.updateFailed,
        description: t.profile.general.errors.tryAgain,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full h-12 px-6 text-base font-medium"
        >
          {t.profile.general.actions.modifyName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.profile.general.dialogs.modifyName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Select 
              value={title} 
              onValueChange={(value: "mr" | "mrs") => setTitle(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t.profile.general.fields.title} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mr">{t.profile.general.titles.mr}</SelectItem>
                <SelectItem value="mrs">{t.profile.general.titles.mrs}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              className="col-span-4"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={t.signup.labels.firstName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              className="col-span-4"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={t.signup.labels.lastName}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t.profile.general.actions.cancel}
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.profile.general.actions.saving}
              </>
            ) : (
              t.profile.general.actions.save
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
