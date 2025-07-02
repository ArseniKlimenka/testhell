-- set first symbol to upper and add "." in the end
update bfx_impl.declaration_main_questions
   set item_text = upper(substring(item_text, 1, 1)) + substring(item_text, 2, len(item_text)) + N'.'
 where not substring(item_text, len(item_text), 1) = '.'

-- set first symbol to lower
update bfx_impl.declaration_medical_questions
   set item_text = lower(substring(item_text, 1, 1)) + substring(item_text, 2, len(item_text))