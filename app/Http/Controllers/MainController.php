<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function __construct(){

    }

    public function index(){
    	//displays main page on get
    	return view('main');
    }

    public function contact(Request $request){
    	//handles contact requests
    	//
    	//redirects back to main url
    	//
    	//
    	//
    	echo "Success";
    }
}
