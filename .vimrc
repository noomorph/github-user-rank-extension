function! StrTrim(txt)
  return substitute(a:txt, '^\n*\s*\(.\{-}\)\n*\s*$', '\1', '')
endfunction

let $PATH = StrTrim(system('yarn bin')).":".$PATH
