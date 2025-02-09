
import { UseFormReturn } from "react-hook-form";
import { GeneralFormValues } from "../../types/profile";
import { useTranslation } from "@/lib/i18n";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface QuestionsSectionProps {
  form: UseFormReturn<GeneralFormValues>;
}

export function QuestionsSection({ form }: QuestionsSectionProps) {
  const { t } = useTranslation();

  const questions = [
    {
      field: "metadata.questionnaire.hasCompanyRegistration",
      translation: t.profile.additionalInfo.questions.companyRegistration
    },
    {
      field: "metadata.questionnaire.acceptsDocumentSharing",
      translation: t.profile.additionalInfo.questions.documentSharing
    },
    {
      field: "metadata.questionnaire.acceptsReferences",
      translation: t.profile.additionalInfo.questions.references
    },
    {
      field: "metadata.questionnaire.hasFinancialCapacity",
      translation: t.profile.additionalInfo.questions.financialCapacity
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        {t.profile.additionalInfo.questions.title}
      </h3>

      <div className="space-y-4">
        {questions.map((question) => (
          <FormField
            key={question.field}
            control={form.control}
            name={question.field}
            render={({ field }) => (
              <FormItem className="grid grid-cols-1 gap-2 md:grid-cols-[2fr,1fr] items-start md:items-center">
                <div className="flex items-start gap-2">
                  <FormLabel className="text-base font-normal leading-tight">
                    {question.translation.label}
                  </FormLabel>
                  {question.translation.hint && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px] text-sm">
                          {question.translation.hint}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                    className="flex items-center justify-end space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id={`${question.field}-yes`} />
                      <Label htmlFor={`${question.field}-yes`}>Oui</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id={`${question.field}-no`} />
                      <Label htmlFor={`${question.field}-no`}>Non</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
