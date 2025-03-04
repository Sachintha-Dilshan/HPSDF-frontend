function ARFileLocationCard(props) {
  return (
    
        
        <div className="display flex shadow-lg items-center rounded-lg transform hover:scale-105 transition ease-out duration-500 cursor-pointer mt-10 w-68 h-40">
      
      <div className="w-52 h-52 ml-4 mb-4 rounded-l-lg">
      {props.Icon}
      </div>
      
      <div className="">
        <h5 className="text-2xl font-bold tracking-tight  text-slate-500 uppercase text-center">
          {props.title}
        </h5>
        
      
        <h3 className=" text-red-700 dark:text-gray-400 text-6xl font-bold text-center mt-6 mb-12">
          {props.count}
        </h3>
</div>
    </div>
    
  )
}

export default ARFileLocationCard